c = document.getElementById("slate");
ctx = c.getContext("2d");
clear = document.getElementById("stop");
var x, y;
var id;

var drawCircle = function(){
  ctx.beginPath();
  ctx.fillStyle="#FF0000";
  ctx.strokeStyle="#000000";
  ctx.clearRect(0, 0, c.width, c.height); //clears previous circle
  ctx.arc(x, y, 15, 0, 2*Math.PI); //draws new circle
  ctx.stroke();
  ctx.fill();
  x += 1;
  y += 1; //circle moves down 1, right 1
  id = window.requestAnimationFrame(drawCircle);
  console.log(id); //debugging
}

var stop = function(){
  if(id){
    window.cancelAnimationFrame(id); //pauses animation
  }
}

var clicked = function(e){
  x = e.offsetX; //remembers previous position of x and y cor of circle
  y = e.offsetY;
  console.log(window.requestAnimationFrame(drawCircle)); //starts animation
}

//adding event listeners
clear.addEventListener("click", stop);
c.addEventListener("click", clicked);
