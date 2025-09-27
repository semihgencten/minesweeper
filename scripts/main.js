import Game from './Game.js';
console.log("main.js worked!");

// Define difficulty levels
const DIFFICULTY_LEVELS = {
  easy: { rows: 8, cols: 10, mineCount:10 },
  medium: { rows: 10, cols: 12, mineCount: 16 },
  hard: { rows: 12, cols: 14, mineCount: 35 },
  expert: { rows: 16, cols: 18, mineCount: 100 }
};

let currentGame = null;

// Show level selection modal on page load
window.addEventListener('DOMContentLoaded', () => {
  showLevelSelection();
});

function showLevelSelection() {
  const modal = document.getElementById("level-select-modal");
  modal.style.display = "flex";

  // Add event listeners for level buttons
  document.getElementById("easy-btn").onclick = () => startGameWithLevel('easy');
  document.getElementById("medium-btn").onclick = () => startGameWithLevel('medium');
  document.getElementById("hard-btn").onclick = () => startGameWithLevel('hard');
  document.getElementById("expert-btn").onclick = () => startGameWithLevel('expert');
}

function startGameWithLevel(level) {
  const config = DIFFICULTY_LEVELS[level];
  
  // Hide level selection modal
  const modal = document.getElementById("level-select-modal");
  modal.style.display = "none";
  
  // Create new game with selected difficulty
  currentGame = new Game(config.rows, config.cols, config.mineCount, "game", showLevelSelection);
}

// === Start the Game ===
// Remove the initial game creation since we now show level selection first