const domPalette = document.querySelector('#palette');
const domPaletteIndex = document.querySelector('#palette-index');


let palettes = [];


function clearPalette() {
  while (domPalette.firstChild) {
    domPalette.removeChild(domPalette.firstChild);
  }
}

function randomPalette() {
  // show palette colors
  paletteColors(Math.floor(Math.random() * palettes.length));
}

// read the colors from a palette
function paletteColors(paletteIndex) {
  let palette = palettes[paletteIndex];

  // show what index
  domPaletteIndex.textContent = `#${paletteIndex+1}`;

  // clear DOM
  clearPalette()

  // create new divs
  let frag = document.createDocumentFragment();
  for (var i = 0; i < palette.length; i++) {
    let divContainer = document.createElement('div');
    divContainer.setAttribute('class', 'palette__color');

    let div = document.createElement('div');
    div.setAttribute('class', 'swatch');
    div.setAttribute('style', `background-color: ${palette[i].hex}`)

    // add details, definition list
    let dl = document.createElement('dl');

    // color name
    let dtColorName = document.createElement('dt');
    dtColorName.appendChild(document.createTextNode('Name'));
    dl.appendChild(dtColorName);
    let ddColorName = document.createElement('dd');
    ddColorName.appendChild(document.createTextNode(palette[i].name));
    dl.appendChild(ddColorName);

    // hex code
    let dt = document.createElement('dt');
    dt.appendChild(document.createTextNode('Hex Code'));
    dl.appendChild(dt);
    let dd = document.createElement('dd');
    dd.appendChild(document.createTextNode(palette[i].hex));
    dl.appendChild(dd);

    // add dl to div
    divContainer.appendChild(div);
    divContainer.appendChild(dl);

    // add div to frag
    frag.appendChild(divContainer);
  }

  // add to DOM
  domPalette.appendChild(frag);
}

// ==================================================

fetch('/scripts/palettes.json')
  // turn into json
  .then(response => response.json())
  .then(data => {
    palettes = data;
    randomPalette();
  });
