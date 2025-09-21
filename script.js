console.log("Minesweeper script loaded!");

class Cell {
  constructor({ id, row, col, container, isMine, onClick }) {
    console.log("cell constructor")
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
      console.log(`Cell ${this.id} flagged`);
    } else {
      this.element.textContent = ""; // remove flag
      console.log(`Cell ${this.id} unflagged`);
    }
  }

  render(container) {
    container.appendChild(this.element);
  }
}

class Game {
  constructor(rows, cols, mineCount, containerId) {
    console.log("game constructor")
    this.rows = rows;
    this.cols = cols;
    this.container = document.getElementById(containerId);
    this.grid = []; // store Cell objects

    const minePositions = this.generateMines(rows, cols, mineCount);
    this.init()
    for (let r = 0; r < rows; r++) {
      this.grid[r] = [];
      for (let c = 0; c < cols; c++) {
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

  generateMines(rows, cols, mineCount) {
    const positions = new Set();

    while (positions.size < mineCount) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      positions.add(`${row}-${col}`);
    }
    return positions;
  }
  init() {
    // Reset container
    this.container.innerHTML = "";

    // Create grid style
    this.container.style.display = "grid";
    this.container.style.gridTemplateColumns = `repeat(${this.cols}, 50px)`;
    this.container.style.gridTemplateRows = `repeat(${this.rows}, 50px)`;
    this.container.style.gap = "1px";
  }

  handleCellClick(cell) {
    console.log(`You clicked cell ${cell.id}`);
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
      restartGame();
    };
    gameOver = true;
  }

  revealCell(cell) {
    if (cell.isRevealed) return;

    cell.isRevealed = true;

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
}

// === Start the Game ===

let gameOver = false;
const game = new Game(15, 15, 50, "game"); 
function restartGame() { // put this into game class
  const game = new Game(15, 15, 50, "game"); 
}
