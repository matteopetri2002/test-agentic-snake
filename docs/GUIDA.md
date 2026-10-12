# Guida progetto TestSnake

## Obiettivo
Imparare a **predisporre un progetto in modo strutturato** usando il sistema di programmazione agentico.
Caso di studio: clone HTML/CSS del gioco Snake.

## Come usare questa guida
Documento vivo. Viene aggiornato dopo ogni input dell'utente.
Contiene: stato, decisioni (con motivazione), cose da fare, punti aperti, cronologia.
Copia canonica: `docs/GUIDA.md` dentro il progetto (versionata con git assieme al codice).

## Stato attuale
- **Fase:** Step 4 COMPLETATO ✅ — architettura scritta. Prossimo: Step 5 (Issue GitHub).
- **Cartella progetto:** `/Users/matteopetri/Desktop/TestSnake` (repo git attivo, branch corrente: `develop`).
- **Repository remoto:** `matteopetri2002/test-agentic-snake` ✅ (PUBBLICO dal 2026-10-12, per abilitare la protezione di `main`).
  - https://github.com/matteopetri2002/test-agentic-snake
- **Branch remoti:** `main` (seed di bootstrap) e `develop` (allineato a `main`).

## Procedura standard di avvio progetto (bootstrap)
Checklist da seguire ogni volta che si inizia un progetto:
1. **Creare la cartella** del progetto.
2. **Aprire OpenCode** (o lo strumento di programmazione agentica) sulla cartella / progetto.
3. **Definire le regole di ingaggio** per la gestione del repository:
   - branch `main` per la produzione
   - branch `develop` per lo sviluppo
   - protezione del branch `main`
   - su `main` solo commit provenienti da PR
   - (regole da completare: vedi sezione "Da fare" Step 1)
4. *(da definire con l'utente — passi successivi: vedi "Metodologia di sviluppo agentico")*

## Metodologia di sviluppo agentico (da zero)
Come gestire un progetto sviluppato con AI agentica, in parole semplici.

### Perché serve un metodo diverso
Con l'AI il codice si scrive in fretta, quindi i problemi si spostano su due cose:
- **Il contesto**: l'AI lavora bene solo se capisce bene il progetto. Servono pochi file chiari che spiegano cosa fare (non prompt brillanti ogni volta).
- **La verifica**: l'AI a volte sbaglia in modo *plausibile* (codice che sembra giusto ma non lo è). Serve qualcuno/qualcosa che controlli: qui, la **revisione umana testando a mano**.

Regola guida: **scrivere meno codice e più "costituzione" del progetto** (cosa fare, perché, come, quando è "fatto").

### Il ciclo di vita (Fasi 0–7)
- **Fase 0 — Bootstrap tecnico** ✅ *(fatto: vedi "Procedura standard di avvio progetto")*
- **Fase 1 — Fondamenta:** `README.md`, `AGENTS.md`, `.gitignore`, struttura cartelle. Niente CI per ora (si è alle prime armi).
- **Fase 2 — Requisiti:** `docs/SPEC.md` = cosa deve fare il gioco, con **criteri di accettazione** (come si capisce che funziona) e **fuori scope esplicito** (cosa NON deve fare, così l'AI non inventa feature).
- **Fase 3 — Progettazione:** `docs/ARCHITECTURE.md` (1 pagina: quali file, a cosa serve ognuno). Separare la **logica pura** (regole del gioco, senza schermo) dagli **adattatori** (disegno, tastiera, salvataggio record): la logica pura si potrà testare senza browser.
- **Fase 4 — Task:** ogni lavoro diventa una **Issue su GitHub**, piccola e con obiettivo chiaro.
- **Fase 5 — Loop di lavoro (per ogni Issue):** branch `feature/…` da `develop` → l'AI implementa → commit → PR verso `develop` → **revisione umana testando a mano** → merge + cancellazione branch.
- **Fase 6 — Release:** `develop` → `main` con PR di release + tag di versione.
- **Fase 7 — Memoria:** le decisioni prese durante il lavoro tornano in `docs/`. Così il progetto si può riprendere in mano in qualsiasi momento.

### Documentazione minima (regola)
Solo 4 file: `README.md`, `AGENTS.md`, `SPEC.md`, `ARCHITECTURE.md`.
Altro (ADR, template, changelog, CI…) **solo quando serve davvero**, non prima.

### Definition of Done (quando un task è "fatto")
1. Fa quello che dice la Issue.
2. La revisione umana testandolo a mano è OK.
3. La guida (`docs/GUIDA.md`) è aggiornata se si è deciso qualcosa di nuovo.

## Decisioni prese
- **Modello di branching:** `main` (produzione) + `develop` (sviluppo) → stile Git Flow semplificato.
- **Protezione `main`:** `main` protetto; modifiche solo tramite Pull Request.
- **Eccezione bootstrap:** il primo commit (seed del repo vuoto) va diretto su `main`; la protezione si applica da subito dopo.
- **Documentazione minima:** solo `README.md`, `AGENTS.md`, `SPEC.md`, `ARCHITECTURE.md`; altro solo quando serve.
- **Revisione:** umana, testando a mano (niente secondo agente reviewer).
- **Task:** uno = una Issue su GitHub; loop = branch `feature/…` → PR verso `develop` → review umana → merge.
- **Test:** introdotti più avanti, pochi e solo sulla logica pura del gioco.
- **CI:** rimandata (si è alle prime armi).
- **Agenti specializzati:** nessuno per ora — un unico agente + revisione umana. Se ne crea uno solo quando un compito diventa ripetitivo, da isolare, o troppo grande per un'unica conversazione (mai per ottimizzazione prematura).
- **Nomi branch:** `feature/…`, `fix/…`, `docs/…`, `chore/…` (kebab-case, es. `feature/game-loop`).
- **Messaggi di commit:** Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`).
- **Merge strategy:** squash merge (ogni PR = un commit pulito).
- **Protezione `main`: TECNICA e attiva ✅ (dal 2026-10-12).** Repo reso **pubblico** (gratis su piano Free) → attivate via API: PR obbligatoria (0 approvazioni: repo singolo), regole valide **anche per il proprietario** (`enforce_admins`), storia lineare (solo squash/rebase, niente merge commit), vietati force-push e cancellazione. Verificata con push diretto di prova → rifiutato (`GH006: Changes must be made through a pull request`).
- **Release `develop` → `main`:** via PR di release + tag di versione (dettaglio operativo quando ci arriviamo).
- **Stack tecnico:** vanilla HTML/CSS/JS puro, zero dipendenze, nessun build (apri `index.html` e gioca).
- **Rendering:** griglia come elementi DOM stilizzati con CSS (niente canvas) — HTML/CSS protagonisti e DOM ispezionabile, più didattico.
- **SPEC v1:** griglia 20×20; frecce+WASD; velocità crescente (150 ms −2%/cibo, min 60 ms); +10/cibo; record in localStorage; schermate start/pausa/game-over; inversione a U vietata; muri letali. Fuori scope: mobile/touch.

## Da fare
### Step 1 — Definire repository e regole di gestione branch
- [x] Hosting: GitHub (`matteopetri2002`)
- [x] Nome e visibilità: `test-agentic-snake` → reso **pubblico** (necessario per la protezione di `main` su piano Free)
- [x] Autenticare `gh` CLI (login utente completato)
- [x] Creare il repo remoto `matteopetri2002/test-agentic-snake` (privato)
- [x] Modello di branching: `main` (produzione) + `develop` (sviluppo)
- [x] Protezione `main`: solo commit da PR
- [x] Convenzione nomi branch: `feature/*`, `fix/*`, `docs/*`, `chore/*` (kebab-case)
- [x] Convenzione messaggi di commit: Conventional Commits
- [x] Merge strategy: squash merge
- [x] Eseguire `git init`, creare `develop`, collegare il remote (+ push `main` e `develop`)
- [x] Protezione tecnica su `main`: **ATTIVA** (repo pubblico → protection via API: PR obbligatoria, enforce_admins, storia lineare, no force-push/deletion; testata con push di prova rifiutato)

### Step 2 — Fondamenta: `README.md`, `AGENTS.md`, `.gitignore`, struttura cartelle
- [x] Stack: vanilla HTML/CSS/JS (A)
- [x] Rendering: griglia DOM + CSS (A)
- [x] `README.md` (cos'è, come si gioca, struttura, flusso)
- [x] `AGENTS.md` (istruzioni operative: struttura, convenzioni, divieti, DoD)
- [x] `.gitignore` (fatto in anticipo per `.DS_Store`)
- [x] Cartelle `css/`, `js/` create (vuote: git non le traccia finché non contengono file; nasceranno con l'implementazione)
### Step 3 — Requisiti: `docs/SPEC.md` (cosa fa il gioco, criteri di accettazione, fuori scope)
- [x] Regole (griglia, movimento, cibo, collisioni, velocità crescente, punteggio)
- [x] Comandi (frecce + WASD, Spazio pausa, R restart)
- [x] Stati (start, gioco, pausa, game over) e record persistente
- [x] Criteri di accettazione manuali (8 punti)
- [x] Fuori scope v1 (mobile/touch e altro)
### Step 4 — Progettazione: `docs/ARCHITECTURE.md` (file, responsabilità, separazione logica/adattatori)
- [x] Flusso dati a senso unico (input → game → stato → render)
- [x] Stato unico + `tick()` senza eventi; loop con `setTimeout` riprogrammato
- [x] Rendering: griglia costruita una volta, aggiornate solo le classi
- [x] Dettagli (coda direzione, no U-turn, `e.repeat`, cibo, coordinate)
- [ ] Step 5 — Backlog: aprire le Issue GitHub per i task
- [ ] Step 6 — Loop agentico per ogni Issue (branch → PR → review umana → merge)
- [ ] Step 7 — Release `develop` → `main` (PR + tag); test sulla logica (più avanti)

## Aperto / da decidere
- Dettaglio operativo release `develop` → `main` (quando ci arriviamo allo Step 7).

## Cronologia
- **2026-10-12** — Impostato l'accordo di lavoro; creata questa guida; avviato lo Step 1.
- **2026-10-12** — Dettata procedura di bootstrap (cartella → apri OpenCode → regole di ingaggio); deciso modello `main`+`develop` con `main` protetto e solo PR.
- **2026-10-12** — Guida spostata nel progetto come copia canonica: `docs/GUIDA.md` (versionata col repo).
- **2026-10-12** — Deciso hosting GitHub (`matteopetri2002/test-agentic-snake`, privato); installata `gh` CLI 2.102.0 via Homebrew; login utente completato.
- **2026-10-12** — Creato repo remoto privato; `git init -b main`; commit di bootstrap (`chore: bootstrap...`, `4fe5be2`) pushato su `main`; creato e pushato `develop` (branch di lavoro corrente).
- **2026-10-12** — Definita la metodologia di sviluppo agentico (doc minima, review umana, Issue GitHub, test/CI più avanti); scritta in guida con ciclo di vita Fasi 0–7 e Definition of Done.
- **2026-10-12** — Trovato `.DS_Store` nella root (file di sistema macOS, non va in git): rimosso e creato `.gitignore` (anticipa parte dello Step 2).
- **2026-10-12** — Deciso: nessun agente specializzato per ora (unico agente + review umana); criterio per crearne uno in futuro.
- **2026-10-12** — Step 1 COMPLETATO: decise convenzioni branch (`feature/*`…), commit (Conventional Commits), merge (squash). Protezione tecnica `main` impossibile su piano Free+privato (403 su protection e ruleset) → prima regola convenzionale.
- **2026-10-12** — Scelta opzione B: repo reso PUBBLICO; protezione `main` attivata via API (PR obbligatoria, enforce_admins, storia lineare) e verificata con push diretto rifiutato (GH006).
- **2026-10-12** — Step 2 COMPLETATO: scelti stack vanilla (A) e rendering DOM+CSS (A); scritti `README.md` e `AGENTS.md`; create cartelle `css/`, `js/`.
- **2026-10-12** — Step 3 COMPLETATO: scritta `docs/SPEC.md` (regole, comandi, stati, record, 8 criteri di accettazione, fuori scope v1).
- **2026-10-12** — Step 4 COMPLETATO: scritta `docs/ARCHITECTURE.md` (flusso input→game→render, stato unico, loop setTimeout, rendering a classi, dettagli direzione/cibo).
