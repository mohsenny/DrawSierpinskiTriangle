var fs = require('fs');
var drawing = require('pngjs-draw');
var png = drawing(require('pngjs').PNG);
 
fs.createReadStream('sierpinski.png')
  .pipe(new png({ filterType: 4 }))
  .on('parsed', function() {
    const offset = 0;
    const trianglePoints = [
    	[125, offset],
    	[offset, 200],
    	[250, 200]
    ];
    
    // draw the traingle edges
    this.drawPixel(trianglePoints[0][0], trianglePoints[0][1], this.colors.black());
    this.drawPixel(trianglePoints[1][0], trianglePoints[1][1],  this.colors.black());
    this.drawPixel(trianglePoints[2][0], trianglePoints[2][1],  this.colors.black());
 
    // draw the first dot
    firstDot = getFirstDotCoordinate();
    this.drawPixel(firstDot[0], firstDot[1], this.colors.green());

    // draw the rest in a loop
    let randomEdge = '';
    let lastDot = firstDot;
    
    for (let i = 0; i < 25000; i++) {
      randomEdge = chooseRandomEdge();
      newDot = calculateNewDot(lastDot, randomEdge, trianglePoints);
      this.drawPixel(newDot[0], newDot[1], this.colors.red());
      lastDot = newDot;
    }

    // Writes file
    this.pack().pipe(fs.createWriteStream('sierpinski.out.png'));
  }
);

function chooseRandomEdge() {
  items = [0, 1, 2];
  return items[Math.floor(Math.random()*items.length)];
}

function getFirstDotCoordinate() {
  return [180, 150];
}

function calculateNewDot(lastDot, edge, trianglePoints) {
  const x = (lastDot[0] + trianglePoints[edge][0]) / 2;
  const y = (lastDot[1] + trianglePoints[edge][1]) / 2;
  return [Math.trunc(x), Math.trunc(y)];
}
