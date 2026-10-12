# SPEC — requisiti del gioco Snake (v1)

Fonte di verità su *cosa deve fare il gioco*. Se non è scritto qui, non si fa
(si propone prima come decisione in `docs/GUIDA.md`).

## Scopo
Clone di Snake in HTML/CSS/JS puro, griglia 20×20 come elementi DOM.
Prima versione (v1): gioco completo da tastiera.

## Regole di gioco
- Il serpente parte lungo 3 caselle al centro, direzione destra.
- Ogni "tick" avanza di una casella nella direzione corrente.
- Mangiare il cibo: serpente +1 casella, punteggio +10.
- Il cibo appare in una casella libera casuale (mai sopra il serpente).
- Velocità iniziale: 1 tick ogni 150 ms; ogni cibo accelera del 2% (minimo 60 ms).
- Game over se sbatte contro i bordi o contro sé stesso (i muri non si attraversano).
- Inversione a U vietata (es. da destra non si va subito a sinistra: comando ignorato).

## Comandi (tastiera)
- Frecce o WASD: cambia direzione.
- Spazio: pausa / riprendi.
- R (o click sul pulsante): ricomincia da game over.
- Qualsiasi freccia/WASD: inizia la partita da schermata start.

## Schermate e stati
- **START**: titolo, record, "premi un tasto per iniziare".
- **GIOCO**: griglia + punteggio + record sempre visibili.
- **PAUSA**: scritta "pausa", gioco congelato (il timer si ferma davvero).
- **GAME OVER**: punteggio, record, "nuovo record!" se battuto, pulsante per ricominciare.

## Record
Salvato in `localStorage`, mostrato in tutte le schermate, sopravvive alla
chiusura del browser.

## Criteri di accettazione (verifica a mano nel browser)
1. Il serpente si muove fluido e risponde sia alle frecce sia a WASD.
2. Mangiare il cibo: +10 punti, serpente allungato di 1, nuovo cibo in casella libera.
3. Dopo diversi cibi la velocità è visibilmente aumentata.
4. Bordo o auto-collisione → game over con punteggio corretto.
5. Il record resta salvato dopo chiusura e riapertura del browser.
6. Spazio mette in pausa e riprende senza "salti" del serpente.
7. Da game over, R ricomincia una partita pulita (punteggio 0, serpente iniziale).
8. L'inversione a U viene ignorata (niente morte istantanea da comando opposto).

## Fuori scope (v1) — NON si fa ora
- Comandi touch/swipe e in generale supporto mobile → task futuro.
- Livelli, ostacoli, più cibi contemporanei, effetti sonori, temi grafici.
- Tutto ciò si aggiunge solo con una nuova decisione registrata in `docs/GUIDA.md`.
