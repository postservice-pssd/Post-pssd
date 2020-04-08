
var sketch = function( p ) {





var yoff = 0.5;        // 2nd dimension of perlin noise

p.setup = function() {
  p.createCanvas(p.windowWidth, p.windowHeight);

};




p.draw = function() {


  var col1 = p.random(0, 255);
  var col2 = p.random(0, 255);
  var col3 = p.random(0, 255);




  //background(51);

  p.fill(50);
  // We are going to draw a polygon out of the wave points
  p.beginShape();

  var xoff = -500;       // Option #1: 2D Noise
  // float xoff = yoff; // Option #2: 1D Noise


  // Iterate over horizontal pixels
  for (var x = 0; x <= p.width +40 ; x += 20) {
    // Calculate a y value according to noise, map to

    // Option #1: 2D Noise
    var y = p.map(p.noise(xoff, yoff), 0, 1, p.mouseY+200,400);

    // Option #2: 1D Noise
    // float y = map(noise(xoff), 0, 1, 200,300);

    // Set the vertex
    p.vertex(x, y);
    // Increment x dimension for noise
    xoff += 0.05;
  }

   var a = y % 200;

  if (a < 180){
    p.fill(50, 80);
    p.stroke(255, 255, 255, 180);
    xoff+= 0.005;
  }

  // increment y dimension for noise
  yoff += 0.008;
  p.vertex(p.width, p.height);
  p.vertex(0, p.height);
  p.endShape();


  p.textSize(40);
    p.stroke(0, 0, 0, 0);
    p.fill(0,0,0);


p.fill(0, 0,0);
      p.text('To see the complete map',p.displayWidth/2.9, p.displayHeight/5.8);
  p.fill(15+(p.frameCount % 80)*5);
  p.text('Join us on Teams!',p.displayWidth/2.9, p.displayHeight/4.4);


  p.stroke(149, 211, 214, 80);
p.fill(50, 80);
  p.stroke(255, 255, 255, 180);

};

};




function printami() {

    console.log('ciao')

};
printami();

var myP5 = new p5(sketch, 'wave');
