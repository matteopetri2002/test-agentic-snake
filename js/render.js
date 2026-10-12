'use strict';

// Disegna lo stato sul DOM. Non contiene regole di gioco: legge solo `state`
// (e i due parametri). Il record non fa parte dello stato (vive in storage.js).
// `isNewRecord` dice se accendere il badge "Nuovo record!": lo decide main.js,
// che sa se il record è stato battuto PRIMA di salvarlo.

let cells = []; // le 400 caselle, create una sola volta da buildGrid()

// Costruisce la griglia 20×20 dentro #grid (da chiamare una volta all'avvio).
function buildGrid() {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  cells = [];
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    grid.appendChild(cell);
    cells.push(cell);
  }
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = String(value);
  }
}

function show(id, visible) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.toggle('hidden', !visible);
  }
}

// Ridisegna tutto a partire da `state` (+ record per l'HUD, + flag per il badge).
function render(state, highScore, isNewRecord = false) {
  if (cells.length === 0) {
    buildGrid();
  }
  const head = state.snake[0];
  const headIdx = head.y * GRID_SIZE + head.x;
  const foodIdx = state.food ? state.food.y * GRID_SIZE + state.food.x : -1;
  const snakeIdx = new Set(state.snake.map((p) => p.y * GRID_SIZE + p.x));

  for (let i = 0; i < cells.length; i++) {
    let cls = 'cell';
    if (i === headIdx) {
      cls += ' head';
    } else if (snakeIdx.has(i)) {
      cls += ' snake';
    }
    if (i === foodIdx) {
      cls += ' food';
    }
    cells[i].className = cls;
  }

  setText('score', state.score);
  setText('high', highScore);
  setText('start-high', highScore);

  show('overlay-start', state.status === 'start');
  show('overlay-pause', state.status === 'paused');

  const over = state.status === 'over';
  show('overlay-over', over);
  if (over) {
    setText('final-score', state.score);
    show('new-record', isNewRecord);
  }
}
