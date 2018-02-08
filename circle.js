'''
Joyce Wu
Softdev2 pd7
K#02 -- They lock us in the tower whenever we get caught...which is often
2018-02-07
'''

c = document.getElementById("slate");
ctx = c.getContext("2d");
stop = document.getElementById("stop");
start = document.getElementById("start");
var grow = true;
var id;
//centers circle in canvas
var x = c.width/2;
var y = c.height/2;
var size;

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
  grow = !grow; //toggles between growing and shrinking
  if(grow){
    size = 10; //if growing, creates a small circle
    id = window.requestAnimationFrame(drawCircle);
  }else{
    size = 300; //if shrinking, creates a large circle
    id = window.requestAnimationFrame(drawCircle);
  }
}

//add event listeners
stop.addEventListener("click", stopFxn);
start.addEventListener("click", startFxn);
