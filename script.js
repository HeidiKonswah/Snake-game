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
  var dirc;
  var headX, headY;
  var food;
  var score;
  var p = false;
  
  function pause(){
    if (p){
      p = false;
    }else{
      p = true;
    }
    console.log("p"+p);
    return p;
  }
 
  //and there we go ...
  //create the array that holds the snake
  function reset(){
    dirc = "right";
    score = 0;
    p = false;
    new_snake();
    new_food();
    if(typeof game != "undefined") clearInterval(game);
    game = setInterval(paint,120);
  }

  function new_snake(){
    var length = 5; //def val
    snake_arr = [];
    for (var i=length-1; i>= 0; i--){
      snake_arr.push({x:i,y:0});
    }
  }

  function new_food(){
    food = {
      x:Math.round(Math.random()*(w-px)/px),
      y:Math.round(Math.random()*(h-px)/px),
    };
  }

  function paint_cell(x,y){
    ctx.fillStyle = "white";
    ctx.fillRect(x*px,y*px, px,px);
    ctx.strokeStyle = "black";
    ctx.strokeRect(x*px,y*px, px,px);
  }

  //draw the snake array
  function paint(){
    if(p) return;
    
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,w,h);

    // x,y of the head
    headX = snake_arr[0].x;
    headY = snake_arr[0].y;

    if(dirc == "right") headX++;
    else if(dirc == "left") headX--;
    else if(dirc == "up") headY--;
    else if(dirc == "down") headY++;




    if(headX == -1 || headX == w/px || headY == -1|| headY == h/px){
      ctx.font= "26pt impact";
			ctx.textAlign = "center";
			ctx.fillStyle = "white";
			ctx.lineWidth = "3";
      ctx.fillText("OOPS!",(w/2)-10,(h/2)-10 );
      window.setTimeout(reset,500);
      return;
    }
 
    if(snake_arr[0].x == food.x && snake_arr[0].y == food.y){
      new_food();
      score++;
      var tail = {x:snake_arr[0].x, y:snake_arr[0].y };
    } else {
      var tail = snake_arr.pop();
      tail.x = headX;
      tail.y = headY;
    }

    snake_arr.unshift(tail);

    for(var i=0; i<snake_arr.length;i++){
      var cell = snake_arr[i];
      paint_cell(cell.x,cell.y);
    }
    paint_cell(food.x,food.y);
    ctx.fillStyle = "white";
    ctx.font= "10pt impact";
		ctx.textAlign = "left";
		ctx.fillStyle = "white";
    ctx.fillText("Score : "+score,10,h-10);
  }

  $(document).keydown(function(e){
    var key = e.which;
    if (key == 40 && dirc != "up") dirc ="down";
    else if (key == 39 && dirc != "left") dirc ="right";
    else if (key == 38 && dirc != "down") dirc ="up";
    else if (key == 37 && dirc != "right") dirc ="left";
    else if (key == 32){
       pause();
       console.log(p);
    }
    console.log("key"+key+" x,y: "+headX+","+headY);
  });

reset();

});
