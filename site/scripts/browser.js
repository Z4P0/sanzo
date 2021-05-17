const domPalette = document.querySelector('#palette');
const domPaletteIndex = document.querySelector('#palette-index');

let colors = [];
let map = [];
let palettes = [];
let currentIndex = 0;


function clearPalette() {
  while (domPalette.firstChild) {
    domPalette.removeChild(domPalette.firstChild);
  }
}

// read the colors from a palette
function paletteColors(paletteIndex) {
  let palette = palettes[paletteIndex];

  // show what index
  domPaletteIndex.textContent = `#${paletteIndex}`;

  // clear DOM
  clearPalette()

  // create new divs
  let frag = document.createDocumentFragment();
  for (var i = 0; i < palette.length; i++) {
    let div = document.createElement('div');
    div.setAttribute('class', 'swatch');
    div.setAttribute('style', `background-color: ${colors[palette[i]].hex}`)

    // add details, definition list
    let dl = document.createElement('dl');

    // color name
    let dtColorName = document.createElement('dt');
    dtColorName.appendChild(document.createTextNode('Name'));
    dl.appendChild(dtColorName);
    let ddColorName = document.createElement('dd');
    ddColorName.appendChild(document.createTextNode(colors[palette[i]].name));
    dl.appendChild(ddColorName);

    // hex code
    let dt = document.createElement('dt');
    dt.appendChild(document.createTextNode('Hex Code'));
    dl.appendChild(dt);
    let dd = document.createElement('dd');
    dd.appendChild(document.createTextNode(colors[palette[i]].hex));
    dl.appendChild(dd);

    // add dl to div
    div.appendChild(dl);

    // add div to frag
    frag.appendChild(div);
  }

  // add to DOM
  domPalette.appendChild(frag);
}

function randomPalette() {
  let randomIndex = Math.floor(Math.random() * palettes.length);

  // update system
  currentIndex = randomIndex;

  // show palette colors
  paletteColors(randomIndex);
}


fetch('/scripts/colors.json')
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
    randomPalette();
  });
