'use strict';

// Traduce i tasti in intenzioni di gioco. Zero logica, zero grafica:
// chiama solo le callback. Chi preme cosa in quale schermata (start, pausa...)
// lo decide main.js, che conosce lo stato — non questo modulo.
//
// Nota: niente callback onStart separata (la Issue la prevedeva). Avviare o
// meno il gioco dipende dallo stato, e lo stato vive in main.js: qui arrivano
// solo intenzioni pure (direzione / pausa / restart).

// e.code = tasto FISICO (funziona con qualsiasi layout di tastiera).
const KEY_DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  KeyW: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  KeyS: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  KeyA: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  KeyD: { x: 1, y: 0 },
};

// Collega i tasti alle intenzioni. Tasti tenuti premuti (e.repeat) ignorati:
// il serpente continua da solo, la ripetizione serve solo a fare danni
// (es. pausa/ripresa a raffica con Spazio tenuto giù).
function initInput({ onDirection, onPause, onRestart }) {
  document.addEventListener('keydown', (e) => {
    if (e.repeat) {
      return;
    }
    const dir = KEY_DIRECTIONS[e.code];
    if (dir) {
      e.preventDefault(); // niente scroll della pagina con frecce/Spazio
      onDirection(dir);
      return;
    }
    if (e.code === 'Space') {
      e.preventDefault();
      onPause();
      return;
    }
    if (e.code === 'KeyR') {
      onRestart();
    }
    // Qualsiasi altro tasto: ignorato.
  });
}
