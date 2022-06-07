const canvas = document.getElementById("canvas");
const scoreE = document.getElementById("scoreE");//- score.clientHeigh
const tipsE = document.getElementById("tipsE");
const scoreaE = document.getElementById("scoreaE");
const bodyE = document.querySelector("#bodyE");
const scorefinalE = document.querySelector("#scorefinalE");
const highest_scoreE = document.querySelector("#highest_scoreE");
const startgamebtn = document.querySelector("#startgamebtn");
const infinitygamebtn = document.querySelector("#infinitygamebtn");
const clearscorebtn = document.querySelector("#clearscorebtn");
const startgamemodel = document.querySelector("#startgamemodel");
const bg = ["#0f172a","#475569","#9ca3af","#374151","#18181b","#525252","#1c1917","#7f1d1d","#7c2d12","#92400e","#713f12","#14532d","#064e3b","#0891b2","#0c4a6e","#1e3a8a","#312e81","#581c87"];

c = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight ;
const cx = canvas.width / 2;
const cy = canvas.height / 2;
class Player{
    constructor(x,y,r,c){
	this.x = x;
	this.y = y;
	this.radius = r;
	this.color = c;
    }
    draw(){
	c.beginPath();
	c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
	c.fillStyle = this.color;
	c.fill();
    }
}
class Projectile{
    constructor(x,y,r,c,v){
	this.x = x;
	this.y = y;
	this.radius = r;
	this.color = c;
	this.velocity = v;
    }
    draw(){
	c.beginPath();
	c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
	c.fillStyle = this.color;
	c.fill();
    }
    update(){
	this.draw();
	this.x>innerWidth? this.x = this.x:this.x=this.x+this.velocity.x;
	this.y>innerHeight? this.y = this.y:this.y=this.y+this.velocity.y;
    }
}

class Enemy{
    constructor(x,y,r,c,v){
	this.x = x;
	this.y = y;
	this.radius = r;
	this.color = c;
	this.velocity = v;
    }
    draw(){
	c.beginPath();
	c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
	c.fillStyle = this.color;
	c.fill();
    }
    update(){
	this.draw();
	this.x=this.x+this.velocity.x;
	this.y=this.y+this.velocity.y;
    }
}

const friction = 0.99;
class Particle{
    constructor(x,y,r,c,v){
	this.x = x;
	this.y = y;
	this.radius = r;
	this.color = c;
	this.velocity = v;
	this.alpha = 1;
    }
    draw(){
	c.save();
	c.globalAlpha = this.alpha;
	c.beginPath();
	c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
	c.fillStyle = this.color;
	c.fill();
	c.restore();
    }
    update(){
	this.draw();
	this.velocity.x *= friction;
	this.velocity.y *= friction;
	this.x=this.x+this.velocity.x;
	this.y=this.y+this.velocity.y;
	this.alpha -= 0.01;
    }
}

let player = new Player(cx,cy,30,"white");
let projectiles = [];
let enemies = [];
let particles = [];
let enemies_hit = 0;
let highest_score = 0;
let hard = 0;
let animationId;
let spawnEnemiesId;
let score = 0;
const tips_hard = ["难度增加！","难度增加！","难度增加！","难度增加！","难度增加！","最终难度"]
const velocity_x_hard = [0.6,1,1.4,1.8,2,2.1];
const velocity_y_hard = [0.6,1,1.4,1.8,2,2.1];
const enemies_hard = [1200,1000,900,800,800,770];
const enemies_hit_hard = [12,40,65,100,160];// [12,30,55,100,160]
player.draw();

function init(){
    hard = 0;
    enemies_hit = 0;
    animationId = 0;
    spawnEnemiesId = 0;
    player = new Player(cx,cy,30,"white");
    projectiles = [];
    enemies = [];
    particles = [];
}
function infinitygameinit(){
    hard = 5;
    enemies_hit = 1000;
    animationId = 0;
    spawnEnemiesId = 0;
    player = new Player(cx,cy,30,"white");
    projectiles = [];
    enemies = [];
    particles = [];
}

function spawnEnemies(){
    //生成敌球
    spawnEnemiesId = setInterval(()=>{
	radius = Math.random() * 26 + 12;
	let x,y;
	if (Math.random() < 0.5){
	    x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
	    y = Math.random() * canvas.height;
	}else{
	    x = Math.random() * canvas.width;
	    y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
	}
	const angle = Math.atan2(cy - y ,cx - x);
	const v = {
	    x:Math.cos(angle)*velocity_x_hard[hard],
	    y:Math.sin(angle)*velocity_y_hard[hard]
	}
	const ecolor = `hsl(${Math.random()*360},50%,50%)`;
	enemies.push(new Enemy(x,y,radius,ecolor,v));
    },enemies_hard[hard]);
}


function hard_change(){
    console.log("hit ",enemies_hit,"hard ",hard);
    if (enemies_hit  == enemies_hit_hard[hard]){
	hard += 1;
	tipsE.innerHTML = tips_hard[hard];
	tipsE.style.color = "#fae8ff";
	gsap.to(tipsE,{autoAlpha:1,duration:2});
	setTimeout(()=>{
	    gsap.to(tipsE, {duration:2,autoAlpha:0,delay:3});
	},1);
    }
}
function animate(){
    animationId = requestAnimationFrame(animate);
    c.fillStyle = bg[hard];
    c.fillRect(0,0,canvas.width,canvas.height);
    player.draw();
    projectiles.forEach((projectile,projectileIndex)=>{
	projectile.update();
	if (projectile.x - projectile.radius < 0 || projectile.x - projectile.radius > canvas.width || projectile.y + projectile.radius < 0 || projectile.y - projectile.radius > canvas.height){
	    //射线消耗
	    setTimeout(()=>{
		projectiles.splice(projectileIndex,1);  
	    },1);
	}
    });
    enemies.forEach((enemy,enemyIndex)=>{
	enemy.update();
	const dist = Math.hypot(player.x - enemy.x,player.y - enemy.y);
	//被碰到
	if(dist - enemy.radius - player.radius < 1){
	    cancelAnimationFrame(animationId);
	    window.clearInterval(spawnEnemiesId);
	    //游戏结束
	    if (score >= highest_score){
		highest_score = score;
		window.localStorage.setItem("highest_score",highest_score);
		highest_scoreE.innerHTML = "最高得分 "+highest_score.toString();
	    }
	    scorefinalE.innerHTML = score;
	    score = 0;
	    scoreE.innerHTML = score;
	    startgamebtn.innerHTML = "再来一局";
	    startgamemodel.style.display = "flex";
	}
	projectiles.forEach((projectile,projectileIndex) => {
	    const dist = Math.hypot(projectile.x - enemy.x,projectile.y - enemy.y);
	    //击中球
	    if(dist - enemy.radius - projectile.radius < 1){
		enemies_hit += 1;
		hard_change();
		for(let i = 0;i < enemy.radius * 1;i ++){
		    particles.push(new Particle(projectile.x,projectile.y,Math.random() * 3 + 1,enemy.color,{x:(Math.random() - 0.5)*(Math.random() * 6),y:(Math.random() - 0.5)*(Math.random() * 6)}))
		}
		if(enemy.radius - 15 > 15){
		    //加分
		    score += parseInt(enemy.radius);
		    scoreE.innerHTML = score;
		    scoreaE.innerHTML = "+"+parseInt(enemy.radius).toString();
		    scoreaE.style.color = "#0ea5e9";//orange-500
		    gsap.to(scoreaE,{autoAlpha:1,duration:1});
		    gsap.to(enemy,{
			radius:enemy.radius - 15
		    });
		    setTimeout(()=>{
			projectiles.splice(projectileIndex,1);
			gsap.to(scoreaE, {duration: 1,autoAlpha: 0,delay:0.5});
		    },1);
		}
		//击中更小球
		else{
		    //加分
		    score += parseInt(enemy.radius);
		    scoreE.innerHTML = score;
		    scoreaE.innerHTML = "+"+parseInt(enemy.radius).toString();
		    scoreaE.style.color = "#d6d3d1";//stone-300
		    gsap.to(scoreaE,{autoAlpha:1,duration:1});
		    setTimeout(()=>{
			gsap.to(scoreaE, {duration: 1,autoAlpha: 0,delay:0.5});
			enemies.splice(enemyIndex,1);
			projectiles.splice(projectileIndex,1);  
		    },1);
		}
	    }
	})
    });
    //球裂开
    particles.forEach((particle,particleIndex)=>{
	if (particle.alpha <= 0){
	    particles.splice(particleIndex,1);
	}else{
	    particle.update();
	}
    });
}

function load_highest_score(){
    try{
	highest_score = window.localStorage.getItem("highest_score");
	if (highest_score == null){
	    highest_scoreE.innerHTML = "最高得分 0";  
	}
	else{
	    highest_scoreE.innerHTML = "最高得分 "+highest_score.toString();
	}
    }
    catch (e){
	console.log("get highest_score error:"+e);
    }
}
window.addEventListener("click",(event)=>{
    const angle = Math.atan2(event.clientY - cy,event.clientX - cx);
    const v = {
	x:Math.cos(angle) * 7 ,
	y:Math.sin(angle) * 7
    }
    console.log("点击|x"+event.clientX+"|y"+event.clientY);
    projectiles.push(new Projectile(cx,cy,5,"rgba(255,255,255,0.9)",v));
    
});
clearscorebtn.addEventListener("click",(event)=>{
    window.localStorage.setItem("highest_score",0);
    highest_score = 0;
    highest_scoreE.innerHTML = "最高得分 0";
});
startgamebtn.addEventListener("click",(event)=>{
    init();
    animate();
    spawnEnemies();
    startgamemodel.style.display = "none";
});
infinitygamebtn.addEventListener("click",(event)=>{
    infinitygameinit();
    animate();
    spawnEnemies();
    startgamemodel.style.display = "none";
    tipsE.innerHTML = "难度最大！<br>存活下来";
    gsap.to(tipsE,{autoAlpha:1,duration:3});
	setTimeout(()=>{
	    gsap.to(tipsE, {duration:2,autoAlpha:0,delay:4});
	},1);
});
bodyE.style.background = bg[Math.floor(Math.random()*bg.length)];
load_highest_score();
//console.log(gsap);
