console.log("Minesweeper script loaded!");

class Cell {
  constructor({ id, row, col, container, isMine, onClick }) {
    this.id = id; // unique identifier for the cell
    this.row = row;
    this.col = col;
    this.isRevealed = false; // later useful in Minesweeper
    this.isFlagged = false;
    this.isMine = isMine; // later will be used
    this.element = document.createElement("div"); // DOM element

    this.element.classList.add("cell");
    // this.element.textContent = id;

    this.element.addEventListener("click", () => onClick(this));
    this.element.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      this.handleRightClick();
    });
  }

  handleRightClick() {
    if (this.isRevealed) return;
    this.isFlagged = !this.isFlagged; // toggle state

    if (this.isFlagged) {
      this.element.textContent = "🚩"; // show flag
    } else {
      this.element.textContent = ""; // remove flag
    }
  }

  render(container) {
    container.appendChild(this.element);
  }
}

class Game {
  constructor(rows, cols, mineCount, containerId) {
    this.rows = rows;
    this.cols = cols;
    this.container = document.getElementById(containerId);
    this.grid = []; // store Cell objects
    this.mineCount = mineCount;
    this.totalSafeCellNumber = rows * cols - mineCount;

    this.init()
  }
  init() {
    // Reset container
    this.container.innerHTML = "";

    // Create grid style
    this.container.style.display = "grid";
    this.container.style.gridTemplateColumns = `repeat(${this.cols}, 50px)`;
    this.container.style.gridTemplateRows = `repeat(${this.rows}, 50px)`;
    this.container.style.gap = "1px";

    const minePositions = this.generateMines(this.rows, this.cols, this.mineCount);
    this.revealedCellsCounter = 0;

    for (let r = 0; r < this.rows; r++) {
      this.grid[r] = [];
      for (let c = 0; c < this.cols; c++) {
        const id = `${r}-${c}`;
        const isMine = minePositions.has(id);

        const cell = new Cell({
          id,
          row: r,
          col: c,
          container: this.container,
          isMine,
          onClick: (cell) => this.handleCellClick(cell),
        })
        cell.render(this.container);
        this.grid[r][c] = cell;
      }
    }
  }

  restartGame() {
    this.init();
  }

  generateMines(rows, cols, mineCount) {
    const positions = new Set();

    while (positions.size < mineCount) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      positions.add(`${row}-${col}`);
    }
    return positions;
  }
  handleCellClick(cell) {
    if (cell.isRevealed || cell.isFlagged) return; // prevent multiple clicks
    if(cell.isMine) {
      this.gameOver();
      return;
    }
    this.revealCell(cell);
  }

  gameOver() {
    const modal = document.getElementById("game-over-modal");
    modal.style.display = "flex"; // show modal (CSS flex centers it)

    const restartButton = document.getElementById("restart-btn");
    restartButton.onclick = () => {
      modal.style.display = "none"; // hide modal
      this.restartGame();
    };
  }

  revealCell(cell) {
    if (cell.isRevealed) return;

    cell.isRevealed = true;
    this.revealedCellsCounter += 1;

    const neighbours = this.getNeighbors(cell);
    const mineCount = neighbours.filter(n => n.isMine).length;

    if(mineCount > 0) {
      this.showNeighbourMinesNumber(cell, mineCount);
    }
    else {
      this.showEmptyCell(cell);
      for(let n of neighbours) {
        this.revealCell(n);
      }
    }
    console.log(this.totalSafeCellNumber)
    console.log(this.revealedCellsCounter)
    if(this.totalSafeCellNumber == this.revealedCellsCounter) {
      this.winGame();
    }
  }

  showNeighbourMinesNumber(cell, mineCount) {
    cell.element.style.backgroundColor = "lightblue";
    cell.element.textContent = mineCount > 0 ? mineCount : "";
  }

  showEmptyCell(cell) {
    cell.element.style.backgroundColor = "lightblue";
  }

  getNeighbors(cell) {
    const neighbors = [];
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    for (let [dr, dc] of directions) {
      const newRow = cell.row + dr;
      const newCol = cell.col + dc;
      if (
        newRow >= 0 && newRow < this.rows &&
        newCol >= 0 && newCol < this.cols
      ) {
        neighbors.push(this.grid[newRow][newCol]);
      }
    }

    return neighbors;
  }

  winGame() {
    startConfetti();

    // const audio = new Audio("winner.mp3");
    // audio.play();

    setTimeout(() => {
      const modal = document.getElementById("win-modal");
      modal.style.display = "flex"; // show modal (CSS flex centers it)

      const restartButton = document.getElementById("win-restart-btn");
      restartButton.onclick = () => {
        modal.style.display = "none"; // hide modal
        stopConfetti();
        this.restartGame();
      };
    }, 500);
  }
}


const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let confettiPieces = [];
function startConfetti() {
  confettiPieces = Array.from({ length: 200 }).map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 10 + 10,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    tilt: Math.random() * 10 - 10
  }));
  requestAnimationFrame(updateConfetti);
}

function updateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confettiPieces.forEach(p => {
    p.y += p.d * 0.2;
    p.x += Math.sin(p.y * 0.01);
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.ellipse(p.x, p.y, p.r, p.r/2, p.tilt, 0, 2 * Math.PI);
    ctx.fill();
  });
  if (confettiPieces.some(p => p.y < canvas.height)) {
    requestAnimationFrame(updateConfetti);
  }
}

function stopConfetti() {
  confettiPieces = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}


// === Start the Game ===
const game = new Game(2, 1, 1, "game"); 
