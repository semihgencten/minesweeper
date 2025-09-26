# Minesweeper 🎮

A simple **Minesweeper game** built with **HTML, CSS, and vanilla JavaScript**.  
This project is a learning exercise to practice DOM manipulation, object-oriented programming, and game logic implementation in JavaScript.  

---

## Features
- Classic Minesweeper grid-based gameplay.
- Left-click to reveal cells.
- Right-click to place/remove flags.
- Automatic reveal of empty neighbors.
- Win/lose conditions with restart option.
- Clean, minimal styling.

---

## How It Works
- The **Game** class:
  - Initializes the board.
  - Places mines randomly.
  - Calculates numbers for neighboring cells.
  - Handles win/lose conditions.

---

- The **Cell** class:
  - Represents each square on the grid.
  - Knows if it is a mine, revealed, or flagged.
  - Handles click interactions.

---

## Goals of This Project
- Practice **object-oriented design** in JavaScript.
- Improve understanding of Javascript
- Create a working game with **minimal code and no libraries**.

---

## How to Play
1. in a terminal run the command "python -m http.server 8000"
2. go to http://localhost:8080/ in your browser
3. Left-click a cell:
   - If it’s a mine 💣 → Game Over.
   - Otherwise, it reveals the number of adjacent mines.
4. Right-click a cell to toggle a 🚩 flag.
5. Clear all non-mine cells to win 🎉.

---

## Next Improvements
- Add difficulty levels (Easy, Medium, Hard).
- Add a timer and score tracking.
- Add animations for a smoother experience.
- Make it mobile-friendly.

---

## License
This project is for **educational purposes**.  
Feel free to use, modify, and share.
