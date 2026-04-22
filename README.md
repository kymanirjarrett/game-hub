# GameHub

GameHub is a browser-based mini-game platform built with React and Vite. It combines multiple game experiences behind a single lobby, shared player identity, and a consistent visual system.

## Table of Contents

- Overview
- Features
- Game Modes
- Technology Stack
- Architecture
- Local Development
- Testing
- Deployment
- Credits
- Course Submission Appendix

## Overview

GameHub provides a unified entry point for multiple games while keeping each game feature modular.

Core goals:

- Let players set a profile (name + avatar) once and use it across games
- Keep game logic isolated by feature
- Support both local and online-style room workflows where applicable
- Maintain an arcade-style interface with preview panels and responsive layouts

## Features

- Home lobby with game selection and interactive preview cards
- Persistent player profile using browser storage
- Game feature set:
   - Rock Paper Scissors
   - Wordle
   - Tic Tac Toe
   - Trivia
   - Pokemon guessing game
- Shared room components for multiplayer-style game flows
- End-to-end test coverage for core user journeys

## Game Modes

- Local single-device gameplay
- Online room workflows for supported games (room create/join/wait/play flows)

## Technology Stack

- React
- React Router
- Vite
- Playwright
- ESLint
- animate.css

External APIs used:

- PokeAPI
- Open Trivia Database
- Random Word API
- DictionaryAPI

## Architecture

High-level structure:

- Routing: [src/routes.jsx](src/routes.jsx)
- Shared UI: [src/components](src/components)
- Feature pages: [src/pages](src/pages)
- Shared utilities: [src/utils](src/utils)
- Styles: [src/styles](src/styles)

Architecture skeleton diagram:

```text
final-project-shinobi/
├── src/
│   ├── components/
│   │   ├── game-room/
│   │   │   ├── GameRoomHeader.jsx
│   │   │   └── RoomPlayerBadge.jsx
│   │   ├── Layout.jsx
│   │   └── Navigation.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── Pokemon.jsx
│   │   ├── RockPaperScissors.jsx
│   │   ├── TicTacToe.jsx
│   │   ├── Trivia.jsx
│   │   ├── Wordle.jsx
│   │   ├── pokemon/
│   │   │   ├── components/
│   │   │   └── hooks/
│   │   ├── rock-paper-scissors/
│   │   │   └── components/
│   │   ├── tic-tac-toe/
│   │   │   ├── components/
│   │   │   └── hooks/
│   │   ├── trivia/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── utils/
│   │   └── wordle/
│   │       ├── components/
│   │       ├── hooks/
│   │       └── utils/
│   ├── hooks/
│   │   └── useRoomPolling.js
│   ├── utils/
│   │   ├── avatars.js
│   │   ├── gameRoomApi.js
│   │   ├── settings.js
│   │   ├── string_formatting.js
│   │   └── theme.js
│   ├── styles/
│   │   ├── HomePage.css
│   │   ├── Navigation.css
│   │   ├── PokemonGame.css
│   │   ├── RPS.css
│   │   ├── TicTacToe.css
│   │   ├── Trivia.css
│   │   └── Wordle.css
│   ├── routes.jsx
│   └── main.jsx
├── tests/
│   ├── hub.spec.ts
│   ├── pokemon.spec.ts
│   ├── trivia.spec.ts
│   ├── wordle.spec.ts
│   └── test-helpers.ts
├── package.json
├── playwright.config.ts
└── vite.config.js
```

Architecture notes:

- Routing is centralized in [src/routes.jsx](src/routes.jsx).
- Feature pages live under [src/pages](src/pages).
- Shared reusable UI lives under [src/components](src/components).
- Shared utilities live under [src/utils](src/utils).
- Game-specific assets, hooks, logic, and components are grouped inside each game feature folder when possible.
- Styles are centralized under [src/styles](src/styles), with the exception of the global app styles.
- The home screen uses a composition config to render the game list and hover previews.
- Pokemon uses feature-local hooks and use-case logic for room polling, tile reveal, and game actions.
- Wordle and Trivia each keep their own feature-local logic and stats storage helpers.

## Local Development

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Run (development)

```bash
npm run dev
```

### Build + preview production locally

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## Testing

Run the Playwright suite:

```bash
npm run test
```

Current focus is end-to-end user flow validation for hub and key game journeys.

## Deployment

This project is configured as a static Vite deployment with base path `/final-project-shinobi/` in [vite.config.js](vite.config.js).

Deployment checklist:

1. Build the app.

```bash
npm run build
```

2. Publish the generated [dist](dist) folder to your static host.
3. Ensure host routing falls back to `index.html` for client-side routes.
4. If using GitHub Pages, keep the repository path aligned with the configured Vite base path.