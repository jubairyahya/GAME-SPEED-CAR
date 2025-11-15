// Getting the canvas element and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Setting canvas dimensions
canvas.width = 1000;
canvas.height = 600;

// Game variables
let isGameRunning = false;
let playerCarX, playerCarY, score, obstacles, gameInterval;
const carWidth = 100;
const carHeight = 70;
const playerSpeed = 5;
const obstacleSpeed = 4;
const obstacleImages = [
    '../Images/ambulance.png', '../Images/black_viper.png', '../Images/mini_truck.png',
    '../Images/police.png', '../Images/taxi.png', '../Images/truck.png', '../Images/mini_van.png'
];

// Load images
const carImage = new Image();
carImage.src = '../Images/audi.png';

const loadedObstacleImages = [];
obstacleImages.forEach(src => {
    const img = new Image();
    img.src = src;
    loadedObstacleImages.push(img);
});

// Initialize game state
function initGame() {
    score = 0;
    obstacles = [];
    playerCarX = canvas.width / 2 - carWidth / 2;
    playerCarY = canvas.height - carHeight - 20;
    isGameRunning = true;
    gameLoop();
    gameInterval = setInterval(createObstacle, 1500);
}

// Draw player car
function drawPlayerCar() {
    ctx.drawImage(carImage, playerCarX, playerCarY, carWidth, carHeight);
}

// Create an obstacle
function createObstacle() {
    const width = Math.random() * (100 - 50) + 100;
    const x = Math.random() * (canvas.width - width);
    const image = loadedObstacleImages[Math.floor(Math.random() * loadedObstacleImages.length)];
    const height = image.height / (image.width / width);
    obstacles.push({ x, y: -carHeight, width, height, image });
}

// Move obstacles
function moveObstacles() {
    obstacles = obstacles.filter(obstacle => {
        obstacle.y += obstacleSpeed;

        // If obstacle goes out of the canvas bounds, increment score and remove obstacle
        if (obstacle.y > canvas.height) {
            score++;  // Increment score when obstacle leaves the screen
            return false;  // Remove obstacle from the array
        }

        // Check for collision
        if (detectCollision(obstacle)) {
            endGame();
            return false;
        }
        
        return true;  // Keep the obstacle if it's still in bounds and no collision
    });
}
// Detect collision
function detectCollision(obstacle) {
    return playerCarX < obstacle.x + obstacle.width &&
        playerCarX + carWidth > obstacle.x &&
        playerCarY < obstacle.y + obstacle.height &&
        playerCarY + carHeight > obstacle.y;
}

// Draw obstacles
function drawObstacles() {
    obstacles.forEach(obstacle => ctx.drawImage(obstacle.image, obstacle.x, obstacle.y, obstacle.width, obstacle.height));
}

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Draw the score
function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}

// Game loop
function gameLoop() {
    if (!isGameRunning) return;

    clearCanvas();
    drawPlayerCar();
    moveObstacles();
    drawObstacles();
    drawScore();

    requestAnimationFrame(gameLoop);
}

// End the game
function endGame() {
    clearInterval(gameInterval);
    isGameRunning = false;
    const username = localStorage.getItem('loggedInUser');
    if (username) {
        saveScore(username, score);
    } else {
        alert('No user logged in. Please login to save your score.');
    }
    alert('Game Over! Your score: ' + score);
    location.reload();
}

// Save the score
function saveScore(username, score) {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ username, score });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0,5);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

// Event listeners
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft' && playerCarX > 0) {
        playerCarX -= playerSpeed;
    } else if (event.key === 'ArrowRight' && playerCarX < canvas.width - carWidth) {
        playerCarX += playerSpeed;
    }
});

document.getElementById('startButton').addEventListener('click', function () {
    if (!isGameRunning) {
        initGame();
    }
});