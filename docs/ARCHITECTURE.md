# ARCHITECTURE — come è organizzato il codice (v1)

## Idea in una frase
La logica del gioco non sa nulla dello schermo: produce uno **stato** (dati puri),
un altro modulo **disegna** quello stato sul DOM. I comandi viaggiano al contrario.

```
tastiera → input.js → game.js (stato) → render.js → schermo
                                ↑
                         main.js (orologio)
```

## Moduli (un file = un ruolo)

| File | Ruolo | Può toccare il DOM? |
|---|---|---|
| `index.html` | pagina, contenitore griglia, HUD, overlay | — (lo contiene) |
| `css/style.css` | tutti gli stili | — |
| `js/game.js` | LOGICA PURA: crea stato, avanza, mangia, collisioni | NO, mai |
| `js/render.js` | disegna lo stato sul DOM | SÌ, solo lui (+ `index.html`) |
| `js/input.js` | traduce i tasti in intenzioni | solo ascolto eventi |
| `js/storage.js` | legge/salva il record (`localStorage`) | no |
| `js/main.js` | collega tutto + orologio di gioco | coordina, non disegna |

## Lo stato (l'unica cosa che conta)
Un solo oggetto, creato da `createGame()` in `game.js`:

```js
state = {
  status: 'start' | 'playing' | 'paused' | 'over',
  snake: [{x, y}, ...],   // testa in posizione 0
  direction: {x, y},       // direzione attuale
  nextDirection: {x, y},   // prossimo cambio (applicato al tick)
  food: {x, y},
  score: 0,
  speedMs: 150,            // diminuisce a ogni cibo (min 60)
}
```

`tick(state)` fa avanzare tutto di un passo (movimento, cibo, collisioni,
velocità). Non restituisce niente: `main.js` legge `state.status` e `state.score`
per decidere cosa fare (fermarsi, mostrare game over...). Niente sistema di eventi:
sarebbe complicazione inutile.

## Game loop (perché `setTimeout` e non `setInterval`)
La velocità cambia durante la partita, quindi a ogni passo si riprogramma
l'orologio con la velocità corrente:

```js
function loop() {
  if (state.status !== 'playing') return;
  tick(state);
  render(state);
  timer = setTimeout(loop, state.speedMs);
}
```

Pausa = `clearTimeout` + stato `paused` (l'orologio si ferma davvero, niente "salti"
alla ripresa). Il record viene salvato solo se battuto, a fine partita.

## Rendering DOM (400 caselle senza fatica)
- All'avvio `render.js` costruisce la griglia **una volta sola** (400 `div`).
- A ogni tick aggiorna solo le **classi** delle celle: `snake`, `head`, `food`.
- HUD (punteggio/record) e overlay (start/pausa/game-over) si accendono/spengono.
- A 20×20 e ~7 tick al secondo il browser non fa fatica: niente ottimizzazioni furbe.

## Dettagli decisi
- **Direzione**: il tasto imposta `nextDirection`; viene applicata al tick; se opposta
  all'attuale viene ignorata (niente inversione a U). Un solo comando in coda così
  le pressioni velocissime non si perdono né si accumulano.
- **Tasti tenuti premuti**: la ripetizione automatica (`e.repeat`) si ignora per
  Spazio (evita pausa/ripresa a raffica), è innocua per le direzioni.
- **Cibo**: casella libera casuale; se la scacchiera è piena (quasi impossibile) →
  partita vinta, trattata come game over con record.
- **Coordinate**: `x` colonna (0–19 da sinistra), `y` riga (0–19 dall'alto).
