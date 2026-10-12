'use strict';

// Record persistente su localStorage. Lo storage non deve MAI rompere il gioco
// (es. navigazione privata, valore corrotto a mano): in caso di problemi si
// torna a 0 in silenzio e la partita continua.

const HIGH_SCORE_KEY = 'snake-high-score';

// Legge il record; 0 se assente, corrotto o non disponibile.
function loadHighScore() {
  try {
    const value = Number.parseInt(localStorage.getItem(HIGH_SCORE_KEY), 10);
    return Number.isFinite(value) && value >= 0 ? value : 0;
  } catch {
    return 0;
  }
}

// Salva il record; se lo storage non è disponibile, non fa niente (niente errori).
function saveHighScore(value) {
  try {
    localStorage.setItem(HIGH_SCORE_KEY, String(value));
  } catch {
    // Il gioco continua senza record persistente.
  }
}
