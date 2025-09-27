# Minesweeper 🎮

A simple **Minesweeper game** built with **HTML, CSS, and vanilla JavaScript**.  
This project is a learning exercise to practice DOM manipulation, object-oriented programming, and game logic implementation in JavaScript.

---

## Github Pages website
Go to the website https://semihgencten.github.io/minesweeper/ and enjoy!

## How to run on a local environment
1. in a terminal run the command "python -m http.server 8000"
2. go to http://localhost:8080/ in your browser

## How to play
1. Left-click a cell:
   - If it’s a mine 💣 → Game Over.
   - Otherwise, it reveals the number of adjacent mines.
2. Right-click a cell to toggle a 🚩 flag.
3. Clear all non-mine cells to win 🎉.
 
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
The game is built with a modular, object-oriented design:
  Game class → Controls the overall game flow, initializes the grid, manages win/lose logic, and tracks progress.
  Cell class → Represents each grid cell, handling its state (hidden, revealed, flagged, or mined) and rendering.
  Animation/Effects module → Keeps visual effects (like confetti) separate from the core logic.
  
This separation of concerns makes the code easier to understand, extend, and debug.
The Game handles rules, the Cell handles behavior, and animations stay independent of gameplay logic.

---

## Goals of This Project
- Practice **object-oriented design** in JavaScript.
- Improve understanding of Javascript
- Create a working game with **minimal code and no libraries**.

---

## Next Improvements
- Add a timer and score tracking.
- Add animations for a smoother experience.
- Make it mobile-friendly.

---

## License
This project is for **educational purposes**.  
Feel free to use, modify, and share.
