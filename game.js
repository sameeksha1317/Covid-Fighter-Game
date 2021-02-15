
function load_images(){
enemy_image = new Image;
enemy_image.src = "Assets/enemy.png";
player_img =new Image;
player_img.src ="Assets/player.png";
sant_img=new Image;
sant_img.src ="Assets/sant.png";
}


function init(){
canvas = document.getElementById("mycanvas");
W=700;
H=400;
canvas.width = W;
canvas.height =H;
pen = canvas.getContext('2d');
game_over =false;
// console.log("pen");
//  box={
//   x : 150,
//   y : 50,
//   w : 60,
//   h : 60,
//   speed : 20,
// };


e1 = {
  x : 150,
  y: 50,
  w : 60,
  h : 60,
  speed : 20,
};

e2 = {
  x : 300,
  y: 150,
  w : 60,
  h : 60,
  speed : 30,
};

e3 = {
  x : 450,
  y: 20,
  w : 60,
  h : 60,
  speed : 40,
};

enemy = [e1,e2,e3];

player = {
  x : 20,
  y: H/2,
  w : 60,
  h : 60,
  speed : 20,
  moving : false,
  health : 100,
};

sant = {
  x : W-100,
  y: H/2,
  w : 60,
  h : 60,

};

canvas.addEventListener('mousedown',function(){
  player.moving=true;
});

canvas.addEventListener('mouseup',function(){
  player.moving=false;
});
}


function isOverlap(rect1,rect2){
  if(rect1.x < rect2.x +rect2.w &&
  rect1.x + rect1.w > rect2.x &&
rect1.y < rect2.y + rect2.h &&
rect1.y + rect1.h > rect2.y){
  return true;
}
return false;
}

function draw(){
  pen.clearRect(0,0,W,H);
  pen.fillStyle = "red";
// pen.fillRect(box.x,box.y,box.w,box.h);


pen.drawImage(player_img,player.x,player.y,player.w,player.h);


pen.drawImage(sant_img,sant.x,sant.y,sant.w,sant.h);
//pen.drawImage(enemy_image,box.x,box.y,box.w,box.h);
for(let i=0;i<enemy.length;i++){
  pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
}

pen.fillStyle = "white";
pen.fillText("Score"+player.health,10,10);
}

function update(){

if(player.moving == true){
  player.x += player.speed;
  player.health +=20;
}
// box.y += box.speed;
// if(box.y >= H-box.h || box.y <0){
//   box.speed *= -1;
// }

for(let i =0;i<enemy.length ;i++){
  if(isOverlap(enemy[i],player)){
    player.health -=50;
    if(player.health < 0){
      game_over= true;
      alert("Game Over");
    }
  }
}


if(isOverlap(player,sant)){

  alert("YOU WON");
  game_over = true;
  return;

}

for(let i =0;i<enemy.length;i++){
  enemy[i].y += enemy[i].speed;
  if(enemy[i].y > H - enemy[i].h || enemy[i].y < 0){
    enemy[i].speed *= -1;
  }
}
}

function gameloop(){
  if(game_over == true){
    clearInterval(f);
  }
  draw();
  update();
  console.log("In loop");
}
load_images();
init();
var f=setInterval(gameloop,100);
