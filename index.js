const colors = require('dictionary-of-colour-combinations');
// var nice_colors = require('nice-color-palettes/1000');
// console.log(nice_colors[0]);

const map = colors.reduce((map, color, i) => {
  color.combinations.forEach(id => {
    if (map.has(id)) map.get(id).push(i);
    else map.set(id, [ i ]);
  });
  return map;
}, new Map());

const palettes = [ ...map.entries() ]
  .sort((a, b) => a[0] - b[0])
  .map(e => e[1]);

// console.log(palettes.length); // 348

// ==================================================

// read the colors from a palette
function paletteColors(palette) {
  console.log(palette);
  for (var i = 0; i < palette.length; i++) {
    console.log(palette[i]);
    console.log(colors[palette[i]]);
  }
}

// random palette
let randomIndex = Math.floor(Math.random() * palettes.length);

// show palette colors
paletteColors(palettes[randomIndex]);
