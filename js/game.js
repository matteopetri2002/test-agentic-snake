'use strict';

// Logica PURA del gioco Snake: niente DOM, niente grafica, solo dati.
// Lo stato è un oggetto semplice; tick() lo fa avanzare di un passo.

const GRID_SIZE = 20;
const START_LENGTH = 3;
const POINTS_PER_FOOD = 10;
const START_SPEED_MS = 150;
const MIN_SPEED_MS = 60;
const SPEED_FACTOR = 0.98; // ogni cibo: -2% al tempo per passo

// Stato iniziale: serpente al centro che va a destra, cibo in casella libera.
function createGame() {
  const cx = Math.floor(GRID_SIZE / 2);
  const cy = Math.floor(GRID_SIZE / 2);
  const snake = [];
  for (let i = 0; i < START_LENGTH; i++) {
    snake.push({ x: cx - i, y: cy });
  }
  const state = {
    status: 'start',
    snake,
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    food: null,
    score: 0,
    speedMs: START_SPEED_MS,
  };
  state.food = placeFood(state);
  return state;
}

// Imposta la prossima direzione; ignora l'inversione a U
// (direzione opposta a quella attuale).
function setDirection(state, dir) {
  const d = state.direction;
  if (dir.x === -d.x && dir.y === -d.y) {
    return;
  }
  state.nextDirection = { x: dir.x, y: dir.y };
}

// Cerca una casella libera casuale (mai sopra il serpente).
// Ritorna null se la scacchiera è piena (partita vinta).
function placeFood(state) {
  const occupied = new Set(state.snake.map((s) => s.x + ',' + s.y));
  const free = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (!occupied.has(x + ',' + y)) {
        free.push({ x, y });
      }
    }
  }
  if (free.length === 0) {
    return null;
  }
  return free[Math.floor(Math.random() * free.length)];
}

// Fa avanzare il gioco di un passo: movimento, cibo, collisioni, velocità.
function tick(state) {
  state.direction = state.nextDirection;
  const head = {
    x: state.snake[0].x + state.direction.x,
    y: state.snake[0].y + state.direction.y,
  };

  // Muri: letali.
  if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
    state.status = 'over';
    return;
  }

  const eating = state.food !== null && head.x === state.food.x && head.y === state.food.y;

  // Se non mangia, la coda si sposta: entrare nella casella della coda è lecito.
  const body = eating ? state.snake : state.snake.slice(0, -1);
  for (const seg of body) {
    if (seg.x === head.x && seg.y === head.y) {
      state.status = 'over';
      return;
    }
  }

  state.snake.unshift(head);

  if (eating) {
    state.score += POINTS_PER_FOOD;
    state.speedMs = Math.max(MIN_SPEED_MS, Math.round(state.speedMs * SPEED_FACTOR));
    state.food = placeFood(state);
    if (state.food === null) {
      state.status = 'over'; // scacchiera piena: vittoria
    }
  } else {
    state.snake.pop();
  }
}
