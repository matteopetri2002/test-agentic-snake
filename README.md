# test-agentic-snake

Clone del gioco Snake in HTML/CSS/JS puro — progetto didattico per imparare
a strutturare un progetto sviluppato con AI agentica.

## Giocare

Apri `index.html` nel browser. Nessuna installazione, nessun build, nessuna dipendenza.

> Stato: in progettazione — il gioco non c'è ancora. Avanzamento in `docs/GUIDA.md`.

## Struttura

- `index.html` — pagina e griglia di gioco
- `css/` — fogli di stile
- `js/` — codice JavaScript (`game.js` logica pura, `render.js` disegno su DOM,
  `input.js` comandi, `storage.js` record, `main.js` collegamento)
- `docs/` — `GUIDA.md` (processo e decisioni), `SPEC.md` (requisiti), `ARCHITECTURE.md` (progetto)

## Sviluppo

- Istruzioni per l'agente AI: `AGENTS.md`
- Processo, decisioni e cose da fare: `docs/GUIDA.md`
- Flusso: Issue GitHub → branch `feature/*` da `develop` → PR → review umana (test a mano) → squash merge. `main` protetto: solo via PR.
