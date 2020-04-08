/**
 * TODO: make this reactive to mouse proximity somehow
 * (opacity adjustments, gravity/attractors, color change, etc)
 * TODO: perf optimize
**/

var NUM_POINTS = 80,
    NUM_JOINS = 8;

var c = document.querySelector('canvas'),
    ctx = c.getContext('2d');

function getRnd(min, max) {
   return Math.random() * (max - min) + min;
}

function getRndInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getDist(p1, p2) {
  return Math.pow(p1.x-p2.x, 2) + Math.pow(p1.y-p2.y, 2);
}

var Point = function(x, y, id) {

  var MIN_SIZE = 2,
      MAX_SIZE = 4,
      MIN_DRIFT = 30,
      MAX_DRIFT = 100;

  this.id = id;
  this.x = this._ox = x;
  this.y = this._oy = y;

  this.opacity = 0.5;
  this.radius = getRndInt(MIN_SIZE,MAX_SIZE);

  this.joins = [];

  var self = this;

  this.draw = function() {

    ctx.beginPath();
    ctx.arc(self.x, self.y, self.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'rgba(255,255,255,' +  self.opacity + ')';
    ctx.fill();

  };

  this.setMotion = function() {
    var dx = getRndInt(MIN_DRIFT, MAX_DRIFT),
        dy = getRndInt(MIN_DRIFT, MAX_DRIFT);

    TweenLite.to(self, getRnd(2,4), {
      x: self._ox + getRndInt(-dx, dx),
      y: self._oy + getRndInt(-dy, dy),
      ease: Circ.easeInOut,
      onComplete: function() {
          self.setMotion();
      }});
  }

}


var points = [];

// create random points
function createPoints() {

  points = [];

  for(var i = 0; i < NUM_POINTS; i++) {
    var x = getRndInt(0, c.width),
        y = getRndInt(0, c.height);

    points.push(new Point(x, y, i));
  }

}

function startMotion() {
  for(var i = 0; i < NUM_POINTS; i++) {
    points[i].setMotion();
  }
}

// Get the closest neighbouring points
// Could prob be more efficient!
function assignNeighbours() {
  for(var i = 0; i < NUM_POINTS; i++) {
    var p = points[i];

    p.joins = [];

    // calculate distances to each point for this one
    var distances = [];

    for(var j = 0; j < NUM_POINTS; j++) {

      if(j == i) continue;

      var op = points[j];
      var dist = getDist(p, op);
      distances.push({ id: j, dist: dist });
    }

    // assign closest 5 as point's neighbours
    var ds = _.sortBy(distances, 'dist');
    var closest = ds.slice(0,NUM_JOINS);

    for(var k = 0; k < closest.length; k++) {
      p.joins.push(points[closest[k].id]);
    }

  }
}

// Track closest points
function update() {
  assignNeighbours();
}

// Render
function draw() {
  ctx.clearRect(0,0,c.width,c.height);

  for(var i = 0; i < NUM_POINTS; i++) {

    var p = points[i];

    // draw points
    p.draw();

    // draw lines
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    for(var j = 0; j < NUM_JOINS; j++) {
      var op = p.joins[j];
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(op.x, op.y);
      ctx.stroke();
    }
  }



}

function mainloop() {
  requestAnimationFrame(mainloop);
  update();
  draw();
}

function init() {
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  createPoints();
  startMotion();
}

// Do it
init();
mainloop();

window.addEventListener('resize', init, false);
