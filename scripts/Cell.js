export default class Cell {
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