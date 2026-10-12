'use strict';

// Collega i moduli (input → game → render) e fa da orologio.
// Macchina a stati: start → playing ⇄ paused → over → (R o click) start.

let state = createGame();
let highScore = loadHighScore();
let timer = null;

function scheduleNext() {
  timer = setTimeout(loop, state.speedMs);
}

function loop() {
  if (state.status !== 'playing') {
    return;
  }
  tick(state);
  if (state.status === 'over') {
    onGameOver();
    return;
  }
  render(state, highScore);
  scheduleNext();
}

function startGame() {
  clearTimeout(timer);
  state = createGame();
  state.status = 'playing';
  render(state, highScore);
  scheduleNext();
}

function togglePause() {
  if (state.status === 'playing') {
    state.status = 'paused';
    clearTimeout(timer);
    render(state, highScore);
  } else if (state.status === 'paused') {
    state.status = 'playing';
    render(state, highScore);
    scheduleNext();
  }
}

function onGameOver() {
  const beaten = state.score > highScore && state.score > 0;
  if (beaten) {
    highScore = state.score;
    saveHighScore(highScore);
  }
  render(state, highScore, beaten); // un solo render: HUD e badge già giusti
}

initInput({
  onDirection: (dir) => {
    if (state.status === 'start') {
      startGame(); // qualsiasi freccia/WASD avvia la partita...
      setDirection(state, dir); // ...e vale già come prima direzione
    } else if (state.status === 'playing') {
      setDirection(state, dir);
    }
    // In pausa e a fine partita i cambi di direzione si ignorano.
  },
  onPause: () => togglePause(),
  onRestart: () => {
    if (state.status === 'over') {
      startGame();
    }
    // A partita in corso R si ignora (niente restart accidentali).
  },
});

document.getElementById('btn-restart').addEventListener('click', () => {
  if (state.status === 'over') {
    startGame();
  }
});

render(state, highScore); // schermata start all'apertura della pagina
