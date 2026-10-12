# Guida progetto TestSnake

## Obiettivo
Imparare a **predisporre un progetto in modo strutturato** usando il sistema di programmazione agentico.
Caso di studio: clone HTML/CSS del gioco Snake.

## Come usare questa guida
Documento vivo. Viene aggiornato dopo ogni input dell'utente.
Contiene: stato, decisioni (con motivazione), cose da fare, punti aperti, cronologia.
Copia canonica: `docs/GUIDA.md` dentro il progetto (versionata con git assieme al codice).

## Stato attuale
- **Fase:** Pianificazione — Step 1: repository e regole di branch.
- **Cartella progetto:** `/Users/matteopetri/Desktop/TestSnake` (contiene `docs/GUIDA.md`; NON è ancora un repo git).
- **Repository remoto:** `matteopetri2002/test-agentic-snake` (da creare).
- **Hosting:** GitHub, repository **privato**.
- **Bloccante:** autenticazione `gh` CLI da completare.

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
4. *(da definire con l'utente — passi successivi)*

## Decisioni prese
- **Modello di branching:** `main` (produzione) + `develop` (sviluppo) → stile Git Flow semplificato.
- **Protezione `main`:** `main` protetto; modifiche solo tramite Pull Request.
- (dettagli da completare: hosting, nomi branch feature, convenzione commit, flusso PR)

## Da fare
### Step 1 — Definire repository e regole di gestione branch
- [x] Hosting: GitHub (`matteopetri2002`)
- [x] Nome e visibilità: `test-agentic-snake`, privato
- [ ] Autenticare `gh` CLI (bloccante per creare il repo da terminale)
- [ ] Creare il repo remoto `matteopetri2002/test-agentic-snake` (privato)
- [x] Modello di branching: `main` (produzione) + `develop` (sviluppo)
- [x] Protezione `main`: solo commit da PR
- [ ] Definire convenzione per i nomi dei branch (`feature/*`, `fix/*`, ... da decidere)
- [ ] Definire convenzione per i messaggi di commit
- [ ] Definire regole di dettaglio per le PR (review, merge strategy, cancellazione branch)
- [ ] Eseguire `git init`, creare `develop`, collegare il remote

### Passi successivi (bozza)
- [ ] Step 2 — Struttura cartelle e file base
- [ ] Step 3 — Requisiti / specifica del gioco (SPEC)
- [ ] Step 4 — Architettura e scelte tecniche
- [ ] Step 5 — Convenzioni per l'agente (es. `AGENTS.md`)
- [ ] Step 6 — Piano a task e implementazione
- [ ] Step 7 — Test e verifica

## Aperto / da decidere
- Autenticazione `gh`: login interattivo dell'utente oppure PAT fornito?
- Convenzione nomi branch feature/fix e messaggi di commit?
- Far girare il flusso via Pull Request anche se si lavora da soli? (utile didatticamente)
- Come promuovere `develop` → `main` (PR di release, tag di versione)?

## Cronologia
- **2026-10-12** — Impostato l'accordo di lavoro; creata questa guida; avviato lo Step 1.
- **2026-10-12** — Dettata procedura di bootstrap (cartella → apri OpenCode → regole di ingaggio); deciso modello `main`+`develop` con `main` protetto e solo PR.
- **2026-10-12** — Guida spostata nel progetto come copia canonica: `docs/GUIDA.md` (versionata col repo).
- **2026-10-12** — Deciso hosting GitHub (`matteopetri2002/test-agentic-snake`, privato); installata `gh` CLI 2.102.0 via Homebrew; in attesa di autenticazione.
