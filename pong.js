const canvas = document.getElementById("pong");
const wordCanvas = document.getElementById("words");

const ctx = document.getElementById("pong").getContext("2d");
const ctx2 = document.getElementById("words").getContext("2d");

ctx2.strokeStyle = "black";
ctx2.lineWidth = 10;
ctx2.strokeRect(0, 175, 5000, 0);
ctx2.strokeRect(0, 350, 5000, 0);
ctx2.strokeRect(0, 525, 5000, 0);
ctx2.strokeRect(0, 700, 5000, 0);

//ctx2.strokeRect(135, 5, 50, 50);

var x;
function refreshWord() {
    var x = document.getElementById("wordInput").value;
    //oneOutput.textContent = x;
    return x;
}

document.getElementById("wordInput")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        var y = refreshWord();
        check(y);
    }
});

var score = 2000;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
  
var alph = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function letter() {
    var c = alph.charAt(getRandomInt(26));
    var s = String(c);
    return s;
}

var one = letter();
var two = letter();
var three = letter();
var four = letter();

function shuffle() {
     one = letter();
     two = letter();
     three = letter();
     four = letter();
     oneOutput.textContent = "" + one;
        twoOutput.textContent = "" + two;
        threeOutput.textContent = "" + three;
        fourOutput.textContent = "" + four;
     //refreshWord();
}

function check(x) {

    one = one.toLowerCase();
    two = two.toLowerCase();
    three = three.toLowerCase();
    four  = four.toLowerCase();
    
    if (x.charAt(0)==one){
        one_();
        shuffle();
    } else if (x.charAt(0) == two){
        two_();
        shuffle();
    } else if (x.charAt(0) == three){
        three_();
        shuffle();
    } else if (x.charAt(0) == four){
        four_();
        shuffle();
    } else {
        x = "";
    }

}
        

const output = document.querySelector('#output');
output.textContent = "Score: " + score;

const oneOutput = document.querySelector('#one');
oneOutput.textContent = "" + one;

const twoOutput = document.querySelector('#two');
twoOutput.textContent = "" + two;

const threeOutput = document.querySelector('#three');
threeOutput.textContent = "" + three;

const fourOutput = document.querySelector('#four');
fourOutput.textContent = "" + four;





drawRect2(0, 0, 20,canvas.height/4, "FireBrick");
drawRect2(0, canvas.height/4, 20,canvas.height/4, "ForestGreen");
drawRect2(0, canvas.height/4 * 2, 20,canvas.height/4, "DarkOrange");
drawRect2(0, canvas.height/4 * 3, 20,canvas.height/4, "MediumSlateBlue");



// Ball object
const ball = {
    x : canvas.width/4,
    y : canvas.height/2,
    radius : 20,
    velocityX : 5,
    velocityY : 5,
    speed : 7,
    color : "WHITE"
}

// User Paddle
const com = {
    x : 0, // left side of canvas
    y : (canvas.height - 100)/2, // -100 the height of paddle
    width : 20,
    height : canvas.height/4,
    color : "White"
}

// COM Paddle
const user = {
    x : canvas.width - 10, // - width of paddle
    y : (canvas.height - 100)/2, // -100 the height of paddle
    width : 20,
    height : canvas.height/4,
    color : "White"
}

// draw a rectangle, will be used to draw paddles
function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawRect2(x, y, w, h, color){
    ctx2.fillStyle = color;
    ctx2.fillRect(x, y, w, h);
}

// draw circle, will be used to draw the ball
function drawCircle(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}
// when COM or USER scores, we reset the ball
function resetBall(){

    if (extraLife != 0) {
        extraLife -= 1;
        return;
    }

    setTimeout(funcWait, 3000); // calls waiting function and makes user wait for 3 seconds

    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 5;
}




// collision detection
function collision(ball,player){
    player.top = player.y;
    player.bottom = player.y + player.height;
    player.left = player.x;
    player.right = player.x + player.width;
    
    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;
    ball.right = ball.x + ball.radius;
    
    return player.left < ball.right && player.top < ball.bottom && player.right > ball.left && player.bottom > ball.top;
}


function speed2() {
    ball.speed = ball.speed * 2;
}

var extraLife = 0;

function heart() {
    extraLife++;
}

var word2;
function slow2() {
    word2 = true;    ball.speed = ball.speed / 2;
}

function word2() {

}

function one_() {
    user.y = 0; 
}
function two_() {
    user.y = canvas.height/4; 
}
function three_() {
    user.y = canvas.height/4 * 2; 
}
function four_() {
    user.y = canvas.height/4 * 3; 
}

four_();

// update function, the function that does all calculations
function update(){
    
    // change the score of players, if the ball goes to the left "ball.x<0" computer win, else if "ball.x > canvas.width" the user win
    if( ball.x - ball.radius < 0 ){
        resetBall();
    }else if( ball.x + ball.radius > canvas.width){
        resetBall();
    }
    
    // the ball has a velocity
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    com.y += ((ball.y - (com.y + com.height/2)))*0.1;
    
    // when the ball collides with bottom and top walls we inverse the y velocity.
    if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
        ball.velocityY = -ball.velocityY;
    }
    
    // we check if the paddle hit the user or the com paddle
    let player = (ball.x + ball.radius < canvas.width/2) ? com : user;
    
    // if the ball hits a paddle
    if(collision(ball,player)){
        // play sound
        // we check where the ball hits the paddle
        let collidePoint = (ball.y - (player.y + player.height/2));
        // normalize the value of collidePoint, we need to get numbers between -1 and 1.
        // -player.height/2 < collide Point < player.height/2
        collidePoint = collidePoint / (player.height/2);
        
            // when the ball hits the top of a paddle we want the ball, to take a -45degees angle
            // when the ball hits the center of the paddle we want the ball to take a 0degrees angle
            // when the ball hits the bottom of the paddle we want the ball to take a 45degrees
            // Math.PI/4 = 45degrees
        let angleRad = (Math.PI/4) * collidePoint;
        
        // change the X and Y velocity direction
        let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        
        // speed up the ball everytime a paddle hits it.
        ball.speed += 0.5;
    }
}

const speed = document.querySelector('#speed');

// render function, the function that does al the drawing
function render(){
    
    // clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, "CadetBlue");
    
    // draw the user's paddle
    drawRect(user.x, user.y, user.width, user.height, user.color);
    
    // draw the COM's paddle
    drawRect(com.x, com.y, com.width, com.height, com.color);
    
    // draw the ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);

    var num = ball.speed;
    speed.textContent = "Ball Speed: " + Math.round(num * 10) / 10;
    // balls

    //refreshWord();
}
function game(){
    update();
    render();
}



// number of frames per second
let framePerSecond = 50;

//call the game function 50 times every 1 Sec
let loop = setInterval(game,1000/framePerSecond);





