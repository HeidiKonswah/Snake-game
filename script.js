$(document).ready(function(){
  //get the canvas
  var canvas = $("#canvas")[0];
  var ctx = canvas.getContext('2d');
  var w = $("#canvas").width();
  var h = $("#canvas").height();
  //draw the canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,w,h);

  // var declarations
  var snake_arr;
  var px = 10;

  //and there we go ...
  //create the array that holds the snake
  function new_snake(){
    var length = 5; //def val
    snake_arr = [];
    for (var i=length-1; i>= 0; i--){
      snake_arr.push({x:i,y:0});
    }
  }
  new_snake();

  //console.log(snake_arr);

  //draw the snake array
  function paint(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,w,h);
    var headX = snake_arr[0].x;
    var headY = snake_arr[0].y;
    headX++;
    var tail = snake_arr.pop();
    tail.x = headX;
    snake_arr.unshift(tail);

    for(var i=0; i<snake_arr.length;i++){
      var cell = snake_arr[i];
      ctx.fillStyle = "white";
      ctx.fillRect(cell.x*px,cell.y*px, px,px);
      ctx.strokeStyle = "black";
      ctx.strokeRect(cell.x*px,cell.y*px, px,px);
    }
  }
	game = setInterval(paint,120);

});
