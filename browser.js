const domPalette = document.querySelector('#palette');

let colors = [];
let map = [];
let palettes = [];
let randomIndex = 0;


// read the colors from a palette
function paletteColors(palette) {
  console.log(palette);
  // add divs to dom
  // clear dom?
  let frag = document.createDocumentFragment();
  for (var i = 0; i < palette.length; i++) {
    console.log(palette[i]);
    console.log(colors[palette[i]]);
    let div = document.createElement('div');
    div.setAttribute('class', 'swatch');
    div.setAttribute('style', `background-color: ${colors[palette[i]].hex}`)
    frag.appendChild(div);
  }
  domPalette.appendChild(frag);
}

fetch('node_modules/dictionary-of-colour-combinations/colors.json')
  // turn into json
  .then(response => response.json())
  .then(data => {
    console.log(data)

    colors = data;

    map = colors.reduce((map, color, i) => {
      color.combinations.forEach(id => {
        if (map.has(id)) map.get(id).push(i);
        else map.set(id, [ i ]);
      });
      return map;
    }, new Map());

    palettes = [ ...map.entries() ]
      .sort((a, b) => a[0] - b[0])
      .map(e => e[1]);

    // random palette
    randomIndex = Math.floor(Math.random() * palettes.length);
    console.log(randomIndex);
    // show palette colors
    paletteColors(palettes[randomIndex]);

  });



// // console.log(palettes.length); // 348

// // ==================================================

