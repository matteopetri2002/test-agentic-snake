# AGENTS.md — istruzioni operative per l'agente AI

## Progetto
Clone di Snake in HTML/CSS/JS puro, griglia di gioco come elementi DOM.
Contesto completo: `README.md` e `docs/GUIDA.md`. Requisiti: `docs/SPEC.md`.

## Avvio e verifica
- Nessun build, nessuna dipendenza: apri `index.html` nel browser.
- La verifica è manuale nel browser (review umana che testa a mano).

## Struttura e responsabilità
- `index.html` — pagina e contenitore della griglia
- `css/style.css` — tutti gli stili
- `js/game.js` — LOGICA PURA (stato, movimento, collisioni, cibo, punteggio). Vietato toccare il DOM qui.
- `js/render.js` — disegna lo stato sul DOM, non contiene regole di gioco
- `js/input.js` — tastiera e touch
- `js/storage.js` — record su localStorage
- `js/main.js` — collega i moduli (game loop)
- `docs/` — `GUIDA.md` (processo), `SPEC.md` (requisiti), `ARCHITECTURE.md` (progetto)

## Convenzioni
- Vanilla JS, zero dipendenze. Aggiungerne una richiede OK umano.
- Identificatori nel codice in inglese, testi visibili (UI) in italiano.
- Commit in stile Conventional Commits (`feat:`, `fix:`, `docs:`, ...).

## Cosa NON fare
- Mai commit/push diretti su `main` (protetto: solo via PR).
- Mai inventare feature fuori da `docs/SPEC.md` (fonte di verità sui requisiti).
- Mai aggiungere tooling/build senza averlo concordato.

## Definition of Done (task "fatto" quando)
1. Fa quello che dice la Issue.
2. Provato a mano nel browser: funziona.
3. `docs/GUIDA.md` aggiornata se si è deciso qualcosa di nuovo.
