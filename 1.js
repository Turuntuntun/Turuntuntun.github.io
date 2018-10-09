var canvas = document.getElementById("wtf");
var context = canvas.getContext('2d');
var canvas1 = document.getElementById("score");
var context1 = canvas1.getContext("2d");
//var canvas2 = document.getElementById("shop");
//var context2 = canvas2.getContext("2d");

var value_of_aster = 100, time_of_fire = 70; koef_time1 = [70 , 60 , 50, 40, 30 , 25, 20, 15, 10], koef_time = 0;
//var z = 1;
var level = 1;
var aster = [];
var timer = 0;
var time = 15, timerold = 0;
var ship ={
	x: 250,
	y: 550,
	life: 5
};
var arrOfLvl = [100, 60, 40, 20, 15, 10, 9, 7, 5, 2];
var bomb = 0;
var expl1 = [{
    x:110,
    y:68,
    animx:0,
    animy:0
    }];
var expl = [];
var fire = [],fire_i = 1, k = [0, 0.4, -0.4, 0.8, -0.8, 1.2, -1,2], k1 = [-5, -4.9, -4.9, -4.8, -4.8, -4.7, -4.7];
var score = 0, score1 = 0;
var randdx1 = 2, randdx2 = 1, randdy1 = 2, randdy2 = 1;

var imgscore = new Image();
imgscore.src = "images/fontext.svg";

var imgdeath = new Image();
imgdeath.src = "images/ff.png"

var imgnew = new Image();
imgnew.src = "images/фывф.svg";

var fonimg = new Image();
fonimg.src = "images/earth1.png";

var astrimg = new Image();
astrimg.src = "images/1234.png";

var shipp = new Image();
shipp.src = 'images/por2.png';

var fireimg = new Image();
fireimg.src = "images/fire.png";

var boom = new Image();
boom.src = "images/1bomb.png";

var clock = new Image();
clock.src = "images/g5065.png";

var coins= new Image();
coins.src = "images/coins3.png";

var heart = new Image();
heart.src = "images/hearth.png";
//Движение 
canvas.addEventListener("mousemove",function(event){
	
     	ship.x = event.offsetX - 1;
		ship.y = event.offsetY - 1;
	
});
//Основная функция
fonimg.onload = function(){
    game();
}
//Функция запускающая следующий уровень.
function pregame(){
	   pregame1();
   	   setTimeout(game, 100);
}
//Покупка апгрейда скорости
function buy_fire1(){
	var cell_fire1 = 5;
	if(score - cell_fire1 >= 0 && koef_time < koef_time1.length-1){
		koef_time++;
		time_of_fire = koef_time1[koef_time];
        score -= cell_fire1;
	}
	context1.clearRect(0, 0, canvas1.width, canvas1.height);
    context1.drawImage(clock, 218 * 6, 242 * 1 , 225, 250, 110, 68, 60,60);
	render_block();   
}
//функция обнуляющая все
function pregame1(){
	   time = 15;
	   $("#but").css("display","none");
	   $("#shop").css("display","none");
       $('#wtf').css("cursor","none");
	   aster.length = 0;
   	   fire.length = 0;
   	   randdx1 ++;	
   	   randdx2 += 0.5;
   	   randdy1 += 0.1;
   	   randdy2 += 0.1;
   	   value_of_aster = arrOfLvl[level - 1];
}
//Функция покупки бомбы
function buy_bomb(){
    var cell_bomb = 50;
    if(score - cell_bomb >= 0 && bomb < 1){
    	bomb++;
    	score -= cell_bomb;
    }
}
//Функция запускающая игру
function game(){
   update();
   render();
   if(time == 0){
   	   pause();
   	   return;
   }
   if(ship.life == 0){
   	ship.x = -100;
   	ship.y = -100;
    setTimeout(death,400);
    return;
   }
   requestAnimationFrame(game);
}
//Кнопка покупки жизней.
function buy_health(){
     var cell_health = 10;
     if(score - cell_health >= 0){
     	score -= cell_health
     	ship.life++;
     }
     context1.clearRect(0, 0, canvas1.width, canvas1.height);
     context1.drawImage(clock, 218 * 6, 242 * 1 , 225, 250, 110, 68, 60,60);
     render_block();
}
//Покупка абгрейда пушки
function buy_fire(){
	var cell_fire = 5;
     if(score - cell_fire >= 0  && fire_i <= k.length - 1){
     	score -= cell_fire;
     	fire_i++;
     	context1.clearRect(0, 0, canvas1.width, canvas1.height);
     	context1.drawImage(clock, 218 * 6, 242 * 1 , 225, 250, 110, 68, 60,60);
        render_block();
     }
}
//Обновление положения
function update(){
    timer++;
    //Начальные значения камней
    if(timer % value_of_aster == 0){
       aster.push({
	        x:Math.random() * 550,
        	y:-50,
	        dx:Math.random() * randdx1 - randdx2,
	        dy:Math.random() * randdy1 + randdy2,
	        del: 0 
        });	
    }
    //Значение огня
    canvas.addEventListener("click",function(){
        if(timer - timerold > time_of_fire){
        for(i = 0; i < fire_i; i++){
    	fire.push({
    		x:ship.x + 20,
    		y:ship.y - 15,
    		dx:k[i],
    		dy:k1[i]		
    	});
}
    	timerold = timer;
    }
    });    
    //Физика огня
    for (i in fire){
    	fire[i].x = fire[i].x + fire[i].dx;
    	fire[i].y = fire[i].y + fire[i].dy;

    	if (fire[i].y < -30) fire.splice(i,1);
    }
    //Взрывы
    for (i in expl){
    	expl[i].animx = expl[i].animx + 0.2;
    	if(expl[i].animx > 4) {
    		expl[i].animy++;
    		expl[i].animx = 0;
    	}
    	if(expl[i].animy > 2) expl.splice(i,1);
    }
    //Анимация часов
    	expl1[0].animx = expl1[0].animx + 0.02;
    	if(expl1[0].animx > 7) {
    		expl1[0].animy++;
    		expl1[0].animx = 0;
    	  if(expl1[0].animy>=2){
    	  	expl1[0].animy = 0;
    	  }
    	}
    //Физика камней
	for ( i in aster){
        aster[i].x += aster[i].dx;
        aster[i].y += aster[i].dy;
        //Границы
        if(aster[i].x >= 550 || aster[i].x < 0) aster[i].dx = -aster[i].dx;
        if(aster[i].y >= 600 ) {
        	aster.splice(i,1);
        	if( score - 5 <= 0){
        		score = 0;
        	}
        	else score -= 5;
        }
        //Проверка столкновений
        for(j in fire){
        		if (Math.abs(aster[i].x + 30 - fire[j].x - 10) < 30 && Math.abs(aster[i].y - fire[j].y) < 25){
        		    score++;
        		    score1 += level;
        		    expl.push({
        		    x:aster[i].x - 25,
        		    y:aster[i].y - 25, 
        		    animx: 0, 
        		    animy: 0 
        		});
        		aster[i].del = 1;
                //Удаление огня
        		fire.splice(j, 1);
        		break;	
        		}
        }
        // Жизни
        if (Math.abs(aster[i].x + 30 - ship.x - 40) < 48 && Math.abs(aster[i].y - ship.y) < 25){
        		    if(ship.life > 0) {
        		    	ship.life--;
        		    }
        		    aster[i].del = 1;
        		      expl.push({
        		    x:aster[i].x - 25,
        		    y:aster[i].y - 25, 
        		    animx: 0, 
        		    animy: 0 
        		});
        		};
        //Удаление камней
        if(aster[i].del == 1) aster.splice(i,1);
        }   
    if(timer % 60 == 0 && time != 0){
        time --;
    }
}
// Отрисовка всего
function render(){
		context.drawImage(fonimg, 0, 0, 600, 600);
		context.drawImage(shipp, ship.x, ship.y, 60, 30);
		for (i in fire) context.drawImage(fireimg, fire[i].x, fire[i].y, 20 , 20);
		for ( i in aster) context.drawImage(astrimg, aster[i].x, aster[i].y , 50 , 50);
		for( i in expl)
			context.drawImage(boom, 225 * Math.floor(expl[i].animx),250 * Math.floor(expl[i].animy),	225,250, expl[i].x, expl[i].y, 100,100);   
        context1.clearRect(0, 0, canvas1.width, canvas1.height);
        for( i in expl1)
			context1.drawImage(clock, 218 * Math.floor(expl1[i].animx),242 * Math.floor(expl1[i].animy),	225,250, expl1[i].x, expl1[i].y, 60,60);
        render_block();
}
//Отрисовка левого блока
function render_block(){    
	    context1.fiilStyle = "#ff";
        context1.font = "30px Arial";
        context1.fillText(score, 60 , 50);
        context1.drawImage(coins, 110, 15, 50, 50);
        context1.fillText( time , 60 , 110);
//        context1.drawImage(clock, 5, 73, 50, 50);
        context1.fillText(ship.life , 60 , 165);
        context1.drawImage(heart, 110, 135, 52, 40 );
}
//Перерыв между уровнями
function pause(){
 	 context.clearRect(0, 0, canvas.width, canvas.height);
	 context.drawImage(fonimg, 0, 0, 600, 600);
	 context.fiilStyle = "#ff";
     context.font = "30px Arial";
	 $("#wtf").css("cursor","default");
	 if (level < 10){	
        render1();	    	
	    level++;
	    } 
	else {
		context.drawImage(imgscore, 0, 150, 600, 100);
	 	context.fillText("Вы прошли игру и набрали " + score1 + " очков", 50, 210);
    }
//	 game();
}
//Отрисовка левого холста
function render1(){
	    context.drawImage(imgscore, 0, 150, 600, 100);
	    context.fillText("Вы прошли уровень " + level, 140, 210);
	    context.font = "20px Arial";
//	    context.drawImage(imgnew, 190, 260, 110, 68, 210, 50);
	    $("#but").css("display","block");
	    $("#shop").css("display","block");
//	    context.fillText("Следующий уровень", 200, 290);
}
//Функция смерти
function death(){
	    $("#but").css("display","none");
	    $("#shop").css("display","none");
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(fonimg, 0, 0, 600, 600);
        context.font = "30px Arial";
        context.drawImage(imgdeath, 0, 150, 600, 100);
        context.fillText("Вы погибли", 210, 210);
}
//Бесконечный цикл анимации(НЕ ТРОГАТЬ!!!)
var requestAnimationFrame = (function(){
	return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	    function(callback){
	    	window.setTimeout(callback,1000/20);
	    };
})();