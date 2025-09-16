console.log("Minesweeper script loaded!");

class Cell {
  constructor(id, container) {
    this.id = id;             // unique identifier for the cell
    this.isRevealed = false;  // later useful in Minesweeper
    this.isMine = false;      // later will be used
    this.element = document.createElement("div"); // DOM element

    this.element.classList.add("cell");
    this.element.textContent = id;

    // Attach click behavior
    this.element.addEventListener("click", () => this.handleClick());

  }

  handleClick() {
    if (this.isRevealed) return; // prevent multiple clicks
    this.isRevealed = true;
    this.element.style.backgroundColor = "lightblue";
    console.log(`You clicked cell ${this.id}`);
  }

  render(container) {
    container.appendChild(this.element)
  }
}

class Game {
  constructor(size, containerId) {
    this.size = size; // e.g., 5 means 5×5
    this.container = document.getElementById(containerId);
    this.cells = []; // store Cell objects

    this.init();
  }

  init() {
    // Reset container
    this.container.innerHTML = "";

    // Create grid style
    this.container.style.display = "grid";
    this.container.style.gridTemplateColumns = `repeat(${this.size}, 50px)`;
    this.container.style.gridTemplateRows = `repeat(${this.size}, 50px)`;
    this.container.style.gap = "5px";

    // Create Cell objects
    for (let i = 1; i <= this.size * this.size; i++) {
      const cell = new Cell(i, this.container);
      this.cells.push(cell);
      cell.render(this.container);
    }
  }

  cellClicked(cell) {
    // Game-wide logic when a cell is clicked
    console.log(`Game knows cell ${cell.id} was clicked!`);

    // Later you’ll handle:
    // - Check if it’s a mine
    // - Reveal neighbors
    // - Win/loss conditions
  }
}

// === Start the Game ===
const game = new Game(5, "game"); // 5×5 board in #game