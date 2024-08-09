// Normal AI for Tic-Tac-Toe
class NormalAI {
    constructor(symbol) {
        this.symbol = symbol;
    }

    makeMove(board) {
        const availableMoves = board.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
}

// Game state
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let isGameActive = true;
let isPlaying = true; // Track if the game is currently playing

// Score counters
let playerWins = 0;
let aiWins = 0;
let draws = 0;

const ai = new NormalAI("O");

// Elements
const cells = document.querySelectorAll(".cell");
const messageElement = document.getElementById("message");
const resetScoreButton = document.getElementById("resetScore");
const playStopButton = document.getElementById("playStop");
const playerScoreElement = document.getElementById("playerScore");
const aiScoreElement = document.getElementById("aiScore");
const drawScoreElement = document.getElementById("drawScore");

// Handle user clicks on cells
function handleCellClick(event) {
    if (!isPlaying || !isGameActive || currentPlayer !== "X") return;

    const clickedCell = event.target;
    const clickedIndex = parseInt(clickedCell.getAttribute("data-index"));

    // Check if the cell is already occupied
    if (board[clickedIndex] !== "") {
        return;
    }

    // Update board and UI
    board[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkForWinner()) {
        playerWins++;
        playerScoreElement.textContent = `Player: ${playerWins}`;
        messageElement.textContent = "Player wins!";
        isGameActive = false;
        setTimeout(restartGame, 1000);
    } else if (board.every(cell => cell !== "")) {
        draws++;
        drawScoreElement.textContent = `Draws: ${draws}`;
        messageElement.textContent = "It's a draw!";
        isGameActive = false;
        setTimeout(restartGame, 1000);
    } else {
        currentPlayer = "O";
        messageElement.textContent = "AI is making a move...";
        setTimeout(() => makeAIMove(), 500);
    }
}

// Check for a winner
function checkForWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(combination => {
        if (combination.every(index => board[index] === currentPlayer)) {
            return true;
        }
        return false;
    });
}

// Restart the game
function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    currentPlayer = "X";
    cells.forEach(cell => {
        cell.textContent = "";
    });

    messageElement.textContent = "Player X's turn";
    updateScoreboard();
}

// Make the AI move
function makeAIMove() {
    if (!isPlaying || !isGameActive) return;

    const action = ai.makeMove(board);
    board[action] = currentPlayer;
    cells[action].textContent = currentPlayer;

    if (checkForWinner()) {
        aiWins++;
        aiScoreElement.textContent = `AI: ${aiWins}`;
        messageElement.textContent = "AI wins!";
        isGameActive = false;
        setTimeout(restartGame, 1000);
    } else if (board.every(cell => cell !== "")) {
        draws++;
        drawScoreElement.textContent = `Draws: ${draws}`;
        messageElement.textContent = "It's a draw!";
        isGameActive = false;
        setTimeout(restartGame, 1000);
    } else {
        currentPlayer = "X";
        messageElement.textContent = "Player X's turn";
    }
}

// Start or stop the game
function playGame() {
    isPlaying = true;
    playStopButton.textContent = "Stop";
    messageElement.textContent = "Player X's turn";
}

// Update scoreboard display
function updateScoreboard() {
    playerScoreElement.textContent = `Player: ${playerWins}`;
    aiScoreElement.textContent = `AI: ${aiWins}`;
    drawScoreElement.textContent = `Draws: ${draws}`;
}

// Reset the scoreboard
function resetScoreboard() {
    playerWins = 0;
    aiWins = 0;
    draws = 0;
    updateScoreboard();
}

// Event listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetScoreButton.addEventListener("click", resetScoreboard);
playStopButton.addEventListener("click", () => {
    if (isPlaying) {
        isPlaying = false;
        playStopButton.textContent = "Play";
        messageElement.textContent = "Game stopped!";
    } else {
        playGame();
    }
});
