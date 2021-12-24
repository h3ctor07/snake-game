import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from "./snake.js";
import { update as updateFood, draw as drawFood} from "./food.js";
import { outsideGrid } from "./grid.js";

const gameBoard = document.getElementById("game-board");
let lastRenderTime = 0;
let gameOver = false;

function main (currentTime){
    if(gameOver){
        if(confirm('Perdiste. Presiona OK para volver a jugar')){
            window.location = '/';
        }
        return
    }
    window.requestAnimationFrame(main);
    const secondsSinceLastRenderTime = (currentTime-lastRenderTime)/1000;
    if(secondsSinceLastRenderTime < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;
    
    update();
    draw();
}

window.requestAnimationFrame(main);

function update (){
    updateSnake();
    updateFood();
    checkForDeath();
    console.log( outsideGrid(getSnakeHead()));
}

function draw(){
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkForDeath(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

