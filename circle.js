// Joyce Wu
// Softdev2 pd7
// K#02 -- They lock us in the tower whenever we get caught...which is often
// 2018-02-07


c = document.getElementById("slate");
ctx = c.getContext("2d");
stop = document.getElementById("stop");
start = document.getElementById("start");
bounce = document.getElementById("bounce");
var grow = true;
var id;
//centers circle in canvas
var x = c.width/2;
var y = c.height/2;
var dx, dy;
var size;
var logo;

var stopFxn = function(e){
  window.cancelAnimationFrame(id); //cancels animation at stop
}

var drawCircle = function(){
  console.log(size); //debug
  ctx.strokeStyle="#000000";
  ctx.fillStyle="#FF0000";
  ctx.beginPath();
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.arc(x, y, size, 0, 2*Math.PI);
  ctx.stroke();
  ctx.fill();
  if(grow){
    size++; //growing size
    id = window.requestAnimationFrame(drawCircle);
  }else{
    size--; //shrinking size
    if(size < 0){ //once circle shrinks to nothing, animation should stop
      stopFxn();
    }else{
      id = window.requestAnimationFrame(drawCircle);
    }
  }
}

var startFxn = function(e){
  if(id){
    stopFxn(); //stops previous function
  }
  x = c.width/2;
  y = c.height/2; //resets initial x, y core
  grow = !grow; //toggles between growing and shrinking
  if(grow){
    size = 10; //if growing, creates a small circle
    id = window.requestAnimationFrame(drawCircle);
  }else{
    size = 300; //if shrinking, creates a large circle
    id = window.requestAnimationFrame(drawCircle);
  }
}

var build_image = function(){
  logo = new Image(); //adding new image to canvas
  logo.src = "dvd_logo.png";
}

var drawBounce = function(){
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.drawImage(logo, x, y, 100, 50);
  //slope change if circle hits the edge
  //x and y coordinates are of top right corner
  if (x + 100 >= c.width || x <= 0){ //hits the right or left edge of canvas
    dx = -dx; //reverses direction
  }if (y + 50 >= c.height || y <= 0){ //hits top or bottom
    dy = -dy;
  }
  x += dx; //changes new position of
  y += dy;
  id = window.requestAnimationFrame(drawBounce);
}

var bounceFxn = function(e){
  if(id){
    stopFxn(); //stops previous animation
  }
  x = c.width/2;
  y = c.height/2; //resets initial ball
  size = 15;
  dx = 1;
  dy = 2; // initially moves up slope of 1/2
  build_image();
  drawBounce();
}

//add event listeners
stop.addEventListener("click", stopFxn);
start.addEventListener("click", startFxn);
bounce.addEventListener("click", bounceFxn);
