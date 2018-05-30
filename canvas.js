var canvas = document.querySelector('canvas');
var pr = pr = window.devicePixelRatio || 1;

canvas.width = innerWidth;
canvas.height = document.querySelector("body").scrollHeight;

var c = canvas.getContext('2d');
c.globalAlpha = 0.05;
c.scale(pr, pr);

function Circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  
  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = 'rgba(192,192,192,0.3)';
    c.stroke();
    
    c.fillStyle = color;
    c.fill();
  }
  
  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
    this.dx = -this.dx;
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0){
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
    
    this.draw();
   }
}

var circleArray = [];

for (var i = 0; i < 1000; i++){
  var radius = Math.random() * 3;
  var x = Math.random() * (innerWidth - radius * 2) + radius;
  var y = Math.random() * (canvas.height - radius * 2) + radius;
  var dx = (Math.random() - 0.5);
  var dy = (Math.random() - 0.5);
  //Random color
  var myArray = ['#999999', '#777777', '#555555', '#333333', '#111111'];
  var color = myArray[Math.floor(Math.random() * myArray.length)];
  circleArray.push(new Circle(x, y, dx, dy, radius, color))
}

function animate (){
  requestAnimationFrame(animate)
  c.clearRect(0, 0, innerWidth, canvas.height);
  circleArray.forEach(function(elem) {
    elem.update();
  })
}

animate();

