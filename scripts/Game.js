import Cell from './Cell.js'
import Confetti from './animations.js';

export default class Game {
  constructor(rows, cols, mineCount, containerId, onRestart) {
    this.rows = rows;
    this.cols = cols;
    this.container = document.getElementById(containerId);
    this.grid = []; // store Cell objects
    this.mineCount = mineCount;
    this.totalSafeCellNumber = rows * cols - mineCount;
    this.onRestart = onRestart; // callback to show level selection

    this.constructGrid()
  }

  constructGrid() {
    // Reset container
    console.log("construct grid")
    this.container.innerHTML = "";

    // Create grid style
    this.container.style.display = "grid";
    this.container.style.gridTemplateColumns = `repeat(${this.cols}, 50px)`;
    this.container.style.gridTemplateRows = `repeat(${this.rows}, 50px)`;
    this.container.style.gap = "1px";

    this.revealedCellsCounter = 0;

    for (let r = 0; r < this.rows; r++) {
      this.grid[r] = [];
      for (let c = 0; c < this.cols; c++) {
        const id = `${r}-${c}`;
        const cell = new Cell({
          id,
          row: r,
          col: c,
          container: this.container,
          isMine: false,
          onClick: (cell) => this.handleCellClick(cell),
        })
        cell.render(this.container);
        this.grid[r][c] = cell;

        this.applyDiagonalOpacity(cell, r, c);
      }
    }
  }

  locateMines(firstRevealedCellRow, firstRevealedCellCol) {
    const minePositions = this.generateMines({
      rows : this.rows, 
      cols : this.cols,
      mineCount : this.mineCount,
      firstRevealedCellRow : firstRevealedCellRow,
      firstRevealedCellCol : firstRevealedCellCol,
    });

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const id = `${r}-${c}`;
        const isMine = minePositions.has(id);
        if(minePositions.has(id)) {
          console.log(this.grid[r][c])
          console.log(typeof this.grid[r][c])
          const cell = this.grid[r][c]
          cell.isMine = true
        }
      }
    }
  }
  applyDiagonalOpacity(cell, row, col) {
    // Calculate which diagonal the cell belongs to
    // Cells on the same diagonal have the same (row + col) value
    const diagonalIndex = (row + col) % 2;
    
    let opacity;
    switch(diagonalIndex) {
      case 0:
        opacity = 1.0;   // 100% opacity
        break;
      case 1:
        opacity = 0.50;  // 75% opacity
        break;
    }
    
    // Apply blue background with calculated opacity
    cell.element.style.backgroundColor = `rgba(173, 216, 230, ${opacity})`; // Light blue with varying opacity
  }

  restartGame() {
    // Show level selection instead of restarting with same parameters
    this.onRestart();
  }

  generateMines({ rows, cols, mineCount, firstRevealedCellRow, firstRevealedCellCol }) {
    const positions = new Set();

    // Build forbidden zone: first cell + its neighbors
    const forbidden = new Set();
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const r = firstRevealedCellRow + dr;
        const c = firstRevealedCellCol + dc;
        if (r >= 0 && r < rows && c >= 0 && c < cols) {
          forbidden.add(`${r}-${c}`);
        }
      }
    }

    // Keep placing mines until count is reached
    while (positions.size < mineCount) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      const key = `${row}-${col}`;

      if (!forbidden.has(key)) {
        positions.add(key);
      }
    }

    return positions;
  }
  handleCellClick(cell) {
    console.log()
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
    if (this.revealedCellsCounter == 0) {
      this.locateMines(cell.row, cell.col)
    }

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
  
    console.log("totalSafeCellNumber ",this.totalSafeCellNumber)
    console.log("revealedCellsCounter ",this.revealedCellsCounter)
    if(this.totalSafeCellNumber == this.revealedCellsCounter) {
      this.winGame();
    }
  }

  showNeighbourMinesNumber(cell, mineCount) {
    // Set color based on mine count
    let backgroundColor;
    switch(mineCount) {
      case 1:
        backgroundColor = "rgba(128, 0, 128, 0.6)"; // purple with 60% opacity
        break;
      case 2:
        backgroundColor = "rgba(255, 255, 0, 0.6)"; // yellow with 60% opacity
        break;
      case 3:
        backgroundColor = "rgba(255, 165, 0, 0.6)"; // orange with 60% opacity
        break;
      case 4:
        backgroundColor = "rgba(255, 0, 0, 0.6)"; // red with 60% opacity
        break;
      default: // 5 and above
        backgroundColor = "rgba(255, 192, 203, 0.7)"; // pink with 70% opacity
        break;
    }
    
    cell.element.style.backgroundColor = backgroundColor;
    cell.element.textContent = mineCount > 0 ? mineCount : "";
  }

  showEmptyCell(cell) {
    cell.element.style.backgroundColor = "gray";
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
    const confetti = new Confetti("confetti-canvas");
    confetti.startConfetti();

    setTimeout(() => {
      const modal = document.getElementById("win-modal");
      modal.style.display = "flex"; // show modal (CSS flex centers it)

      const restartButton = document.getElementById("win-restart-btn");
      restartButton.onclick = () => {
        modal.style.display = "none"; // hide modal
        confetti.stop();
        this.restartGame();
      };
    }, 500);
  }
}