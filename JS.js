const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let socerhtml = document.getElementById("socer")

canvas.width = 608;
canvas.height = 608;

const apple = new Image();
apple.src = "img/apple.png";

let box = 32;
let socer = 0;
let snake = [];

snake[0] = {
    x: 9*box,
    y: 9*box,
};

let applyC = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box,
}

document.addEventListener("keydown", main);

let direction;

function main(event){
    if(event.keyCode == 37 && direction != "right"){
        direction = "left";
    }
    else if(event.keyCode == 38 && direction != "down"){
        direction = "up";
    }
    else if(event.keyCode == 39 && direction != "left"){
        direction = "right";
    }
    else if(event.keyCode == 40 && direction != "up"){
        direction = "down";
    }
}

function crash(head, snake){

    for(let i = 1; i < snake.length; i++){

        if(head.x == snake[i].x && head.y == snake[i].y){

            ctx.fillStyle = "red";
            ctx.fillRect(snake[0].x, snake[0].y, box, box);

            clearInterval(time);

            alert("You lost((")
            let again = confirm("Try again?")
            
            snake.length = 0;
            socer = 0;

            if(again) time = setInterval(draw, 100)
        }
    }
}

function draw(){

    if(snake[0].x > 576) snake[0].x = 0;
    if(snake[0].y > 576) snake[0].y = 0;
    if(snake[0].x < 0) snake[0].x = 576;
    if(snake[0].y < 0) snake[0].y = 576;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(apple, applyC.x, applyC.y);

    for(let i = 0; i < snake.length; i++){
        ctx.fillStyle = "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snake[0].x == applyC.x && snake[0].y == applyC.y){
        socer++;
        socerhtml.innerHTML = `Socer: ${socer}`; 

        applyC = {
            x: Math.floor(Math.random() * 19) * box,
            y: Math.floor(Math.random() * 19) * box,
        }

    }else{
        snake.pop();   
    }

    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "right") snakeX += box;
    if(direction == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY,
    };

    crash(newHead, snake)

    snake.unshift(newHead);
}

let time = setInterval(draw, 100)