
$(document).ready(function(){
  //---canvas
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  //---square
  var squareCentreX = canvas.width/2;
  var squareCentreY = canvas.height/2;
  var squareDim = 400;
  var square = {x:0, y: 0, dx: 0, dy: 0};
  //---controls
  var spacePressed = false;
  var side = getRandomInt(1, 4);
  var newSquare = true;
  //
  var score = 0;
  var speed = 60;
  var interval;


  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);


  function keyDownHandler(e) {
    if(e.keyCode == 32){
      spacePressed = true;
      newSquare = true;
      side = getRandomInt(1, 4);
      //square landed in box
      if(inBounds()){
        console.log("in bounds");
        //level up
        score++;
        speed = speed/1.4;
        //make bounds smaller

      }
      else{
        console.log("out");
        //make box bigger
      }
    }
  }

  function keyUpHandler(e) {
    if(e.keyCode == 32){
      spacePressed = false;
    }
  }

  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function drawSquare() {
    ctx.beginPath();
    ctx.rect(squareCentreX-squareDim/2, squareCentreY-squareDim/2, squareDim, squareDim);//x, y, w, h
    ctx.fillStyle = "#FF0000";
    ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
    ctx.stroke();
    ctx.closePath();
}

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSquare();
    drawScore();
    makeMovingSquare(side);
    console.log("speed: "+ speed);
    clearInterval(interval);
    interval = setInterval(draw, speed);
  }

  function makeMovingSquare(side) {
    var size = 12;
    ctx.beginPath();
    if(newSquare){
      if(side === 1){//left side
        square.x = 0
        square.y = canvas.height/2
        square.dx = 5;
        square.dy = 0;
      }
      else if (side === 2) {//top
        square.x = canvas.width/2
        square.y = 0
        square.dx = 0;
        square.dy = 5;
      }
      else if (side === 3) {//right side
        square.x = canvas.width - size;
        square.y = canvas.height/2
        square.dx = -5;
        square.dy = 0;
      }
      else if (side === 4) {//bottom
        square.x = canvas.width/2;
        square.y = canvas.height-size;
        square.dx = 0;
        square.dy = -5;
      }
      newSquare = false;
    }
    ctx.rect(square.x, square.y, size, size);
    ctx.fillStyle = "#FF0000";
    ctx.fill();

    square.x += square.dx;
    square.y += square.dy;

    ctx.closePath();
  }


  function inBounds(){
    if(square.x >= squareCentreX-(squareDim/2) && square.x <= squareCentreX+(squareDim/2)){
      if(square.y >= squareCentreY-(squareDim/2) && square.y <= squareCentreY+(squareDim/2)){
        return true;
      }
    }
    return false;
  }

  interval = setTimeout(draw, speed);


});
