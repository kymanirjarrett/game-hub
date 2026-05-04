# GameHub

A browser-based mini-game platform built with **React 19** and **Vite 7**. Five games share a single lobby, a persistent player profile, and a unified visual system.

[![Deploy React Application](https://github.com/kymanirjarrett/game-hub/actions/workflows/deploy.yml/badge.svg)](https://github.com/kymanirjarrett/game-hub/actions/workflows/deploy.yml)

> **Live demo:** [kymanirjarrett.github.io/game-hub](https://kymanirjarrett.github.io/game-hub)

---

## Table of Contents

- [Overview](#overview)
- [Games](#games)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [External APIs](#external-apis)
- [Local Development](#local-development)
- [Testing](#testing)
- [Deployment](#deployment)

---

## Overview

GameHub provides a single entry point for a collection of browser games while keeping each game completely self-contained.

**Core design goals:**

- Set a player profile (name + avatar) once; it persists across all games via `localStorage`
- Each game feature owns its components, hooks, logic, and API calls inside its own folder
- Shared room infrastructure (create / join / wait / play flows) is reused across multiplayer-style games
- An arcade-style home screen renders interactive preview cards driven by a declarative game registry

---

## Games

| Game | Route | Mode | Description |
|---|---|---|---|
| 🎮 Rock Paper Scissors | `/rps` | Single-player | Play against the computer; tracks session history and all-time high scores |
| 📝 Wordle | `/wordle` | Single-player | Guess the five-letter word in six attempts |
| ⬛ Tic Tac Toe | `/tic-tac-toe` | Local multiplayer | Pass-and-play with a room lobby and waiting room |
| 🧠 Trivia | `/trivia` | Single-player | Timed multiple-choice questions pulled from the Open Trivia DB |
| 🖼️ Pokémon | `/pokemon` | Local multiplayer | Progressively reveal a hidden Pokémon sprite; guess before your opponent |

---

## Tech Stack

| Layer | Library / Tool |
|---|---|
| UI framework | React 19 |
| Routing | React Router v6 |
| Build tool | Vite 7 |
| Styling | Vanilla CSS + animate.css + normalize.css |
| E2E tests | Playwright |
| Unit tests | Vitest + jsdom |
| Linting | ESLint 9 (flat config) |
| CI / CD | GitHub Actions → GitHub Pages |

---

## Architecture

```text
game-hub/
├── src/
│   ├── components/                   # Shared reusable UI
│   │   ├── game-room/
│   │   │   ├── GameRoomHeader.jsx
│   │   │   └── RoomPlayerBadge.jsx
│   │   ├── AppLayout.jsx
│   │   └── Navigation.jsx
│   │
│   ├── pages/                        # Feature pages (one folder per game)
│   │   ├── Games.jsx                 # Declarative game registry (drives home screen)
│   │   ├── HomePage.jsx
│   │   │
│   │   ├── preview/                  # Isolated hover-preview components
│   │   │   ├── RockPaperScissorsPreview.jsx
│   │   │   ├── TicTacToePreview.jsx
│   │   │   ├── TriviaPreview.jsx
│   │   │   └── WordlePreview.jsx
│   │   │
│   │   ├── pokemon/
│   │   │   ├── PokemonGame.jsx
│   │   │   ├── components/           # ActionPanel, GameHeader, TileBoard, …
│   │   │   ├── hooks/                # useGameActions, usePokemon, useTileReveal
│   │   │   ├── logic/                # pokemonLogic.js
│   │   │   └── utils/                # pokemonApi.js
│   │   │
│   │   ├── rock-paper-scissors/
│   │   │   ├── RPSGame.jsx
│   │   │   ├── components/           # GameHeader, GameSection, HighScoresSection, …
│   │   │   └── logic/                # rpsLogic.js
│   │   │
│   │   ├── tic-tac-toe/
│   │   │   ├── TicTacToeGame.jsx
│   │   │   ├── components/           # TicTacToeBoard, Lobby, WaitingRoom, Result
│   │   │   └── logic/
│   │   │
│   │   ├── trivia/
│   │   │   ├── TriviaGame.jsx
│   │   │   ├── components/           # TriviaQuestion, TriviaControls, TriviaSummary
│   │   │   ├── hooks/
│   │   │   └── utils/
│   │   │
│   │   └── wordle/
│   │       ├── WordleGame.jsx
│   │       ├── components/           # WordleBoard, WordleKeyboard
│   │       ├── hooks/                # useWordleGame
│   │       └── utils/                # wordleApi.js
│   │
│   ├── styles/                       # Global / cross-game stylesheets
│   │   ├── GamePageHeader.css
│   │   ├── HomePage.css
│   │   ├── Navigation.css
│   │   ├── PokemonGame.css
│   │   ├── RPS.css
│   │   ├── TicTacToe.css
│   │   ├── trivia.css
│   │   └── wordle.css
│   │
│   ├── utils/                        # Shared utilities & hooks
│   │   ├── avatars.js
│   │   ├── gameRoomApi.js
│   │   ├── settings.js
│   │   ├── string_formatting.js
│   │   ├── theme.js
│   │   └── useRoomPolling.js
│   │
│   ├── routes.jsx                    # Centralized React Router config
│   └── main.jsx
│
├── tests/                            # Playwright E2E test suite
│   ├── hub.spec.ts
│   ├── pokemon.spec.ts
│   ├── rps.spec.ts
│   ├── trivia.spec.ts
│   ├── wordle.spec.ts
│   └── test-helpers.ts
│
├── playwright.config.ts
├── vite.config.js
└── package.json
```

### Key architecture decisions

| Decision | Detail |
|---|---|
| Centralized routing | All routes are declared in [`src/routes.jsx`](src/routes.jsx) |
| Game registry | [`src/pages/Games.jsx`](src/pages/Games.jsx) exports a `games` array that drives the home screen card grid and preview animations — adding a new game requires only a new entry here |
| Feature-local code | Each game owns its `components/`, `hooks/`, `logic/`, and `utils/` sub-folders; nothing leaks across games |
| Shared room layer | `src/utils/gameRoomApi.js` and `src/utils/useRoomPolling.js` provide reusable room creation / polling without coupling to any one game |
| Preview components | `src/pages/preview/` contains lightweight animated preview components, decoupled from full game logic |
| Styles centralized | `src/styles/` holds cross-game stylesheets; per-game styles that are tightly coupled live alongside their feature |

---

## External APIs

| API | Used by | Purpose |
|---|---|---|
| [PokeAPI](https://pokeapi.co) | Pokémon | Fetch random Gen 1 Pokémon sprites and names |
| [Open Trivia Database](https://opentdb.com) | Trivia | Fetch categorized trivia questions |
| [Random Word API](https://random-word-api.herokuapp.com) | Wordle | Fetch the daily target word |
| [DictionaryAPI](https://dictionaryapi.dev) | Wordle | Validate that a guess is a real word |

---

## Local Development

### Prerequisites

- **Node.js 20+**
- **npm**

### Install

```bash
npm install
```

> `postinstall` automatically downloads the Chromium binary required by Playwright.

### Run dev server

```bash
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173) automatically.

### Build & preview production build locally

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Testing

The project uses **Playwright** for end-to-end tests and **Vitest** for unit tests.

### Run E2E tests (Playwright)

```bash
npm run test
```

Playwright builds the app, starts the preview server, then runs the full suite against Chromium.

**Test coverage:**

| Spec | Scenarios |
|---|---|
| `hub.spec.ts` | Home screen renders, game cards navigate correctly |
| `rps.spec.ts` | Settings persist, game plays, history records, high scores update |
| `trivia.spec.ts` | Question loads, answer selection, timer, summary screen |
| `wordle.spec.ts` | Guess submission, correct/incorrect colour feedback |
| `pokemon.spec.ts` | Lobby, room join, tile reveal flow |

---

## Deployment

The app is deployed automatically to **GitHub Pages** on every push to `main` via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

The workflow:
1. Checks out the repo
2. Installs dependencies (skipping Playwright browser downloads in CI)
3. Builds with `--base=/<repo-name>/` so asset paths resolve correctly on Pages
4. Copies `dist/index.html` → `dist/404.html` as an SPA fallback
5. Uploads and deploys the `dist/` folder

### Manual deployment to any static host

```bash
npm run build
```

Publish the generated `dist/` folder. Ensure your host serves `index.html` as the fallback for all routes.