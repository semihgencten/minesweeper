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
    this.cells = []; // store Cell objects

    const minePositions = this.generateMines(rows, cols, mineCount);
    this.init()
    for (let r = 0; r < rows; r++) {
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

        this.cells.push(cell);
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
    this.container.style.gap = "5px";
  }

  handleCellClick(cell) {
    console.log(`You clicked cell ${cell.id}`);
    if (cell.isRevealed || cell.isFlagged) return; // prevent multiple clicks
    cell.isRevealed = true;
    if(cell.isMine) {
      this.gameOver();
      return;
    }
    this.showNeighbourMinesNumber(cell);
  }

  gameOver() {
    // show a pop up and 
    gameOver = true;
    console.log("game over")
    restartGame();
  }

  showNeighbourMinesNumber(cell) {
    cell.element.style.backgroundColor = "lightblue";
    console.log("no mine, safe")
  }
}

// === Start the Game ===

let gameOver = false;
const game = new Game(10, 10, 8, "game"); 
function restartGame() {
  const game = new Game(10, 10, 8, "game"); 
}
