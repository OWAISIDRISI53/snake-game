let gameBoard = document.getElementById('gameBoard');
let scoreDiv = document.querySelector('.score span')
let hiScoreDiv = document.querySelector('.hi-score span')
let instruction = document.querySelector(".instruction")
let btn = document.querySelector(".btn")

// defining game variables
let gridSize = 20
let inputDir = { x: 0, y: 0 }
let snake = [{ x: 10, y: 10 }]
let food = generateFood()
const speed = 7
let score = 0
let gameOver = false
let gameStarted = false

let hiScore = localStorage.getItem('snake-hiScore')
function game() {
    instruction.style.display = 'none'
    if (!gameOver) {
        gameEngine()
    }
    setTimeout(game, 1000 / speed)
}

function gameEngine() {

    // updating hiScore
    if (hiScore !== undefined) {
        hiScoreDiv.innerHTML = Number(hiScore)
    }

    // Part 1: Updating the snake array & Food
    const head = { ...snake[0] }

    // wall collision
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        gameOver = true
    }

    // self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true
        }
    }

    // If GAME OVER
    if (gameOver) {
        if (score > Number(hiScore)) {
            localStorage.setItem('snake-hiScore', score.toString())
        }
        alert("Game Over! Score is :" + score)
        window.location.reload()
        return
    }

    // move the snake
    head.x += inputDir.x
    head.y += inputDir.y

    snake.unshift(head)
    // if snake is eating food then update and show score
    if (head.x === food.x && head.y === food.y) {
        food = generateFood()
        score++
        scoreDiv.innerHTML = score
    }
    else {
        snake.pop()
    }

    // Part 2: Display the snake and food
    // display snake
    gameBoard.innerHTML = ""
    snake.forEach((segment, index) => {
        snakeElement = document.createElement('div')
        snakeElement.style.gridRow = segment.y
        snakeElement.style.gridColumn = segment.x
        if (index === 0) {
            snakeElement.classList.add("head")
        }
        else {
            snakeElement.classList.add("snake")
        }
        gameBoard.appendChild(snakeElement)
    })

    // display food
    foodElement = document.createElement("div")
    foodElement.style.gridRow = food.y
    foodElement.style.gridColumn = food.x
    foodElement.classList.add("food")
    gameBoard.appendChild(foodElement)
}

function generateFood() {
    let x = Math.floor(Math.random() * gridSize) + 1
    let y = Math.floor(Math.random() * gridSize) + 1
    return { x, y }
}

function keyPressHandler(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (inputDir.y === 0) inputDir = { x: 0, y: -1 }
            break;
        case 'ArrowDown':
            if (inputDir.y === 0) inputDir = { x: 0, y: 1 }
            break;
        case 'ArrowLeft':
            if (inputDir.x === 0) inputDir = { x: -1, y: 0 }
            break;
        case 'ArrowRight':
            if (inputDir.x === 0) inputDir = { x: 1, y: 0 }
            break;
    }
}

document.addEventListener('keydown', keyPressHandler)



btn.addEventListener('click', () => {
    gameStarted = true
    if (gameStarted) {
        game()
    }
})