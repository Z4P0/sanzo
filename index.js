const colors = require('dictionary-of-colour-combinations');
// var nice_colors = require('nice-color-palettes/1000');

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

console.log(palettes.length); // 348

// get a random palette
const randomPalette = palettes[Math.floor(Math.random() * palettes.length)];
console.log(randomPalette);

// list the color palette
for (var i = 0; i < randomPalette.length; i++) {
  console.log(colors[i]);
}


// /**
//  * Shuffles array in place. ES6 version
//  * @param {Array} a items An array containing the items.
//  */
// function shuffle(a) {
//     for (let i = a.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [a[i], a[j]] = [a[j], a[i]];
//     }
//     return a;
// }

// nice_colors = shuffle(nice_colors);
// console.log(nice_colors[0]);
