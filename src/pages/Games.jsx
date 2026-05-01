import HiddenPicturePreview from "./pokemon/components/HiddenPicturePreview";
import { RockPaperScissorsPreview } from "./preview/RockPaperScissorsPreview";
import { WordlePreview } from "./preview/WordlePreview";
import { TicTacToePreview } from "./preview/TicTacToePreview";
import { TriviaPreview } from "./preview/TriviaPreview";

export const games = [
  {
    key: "rps",
    path: "/rps",
    name: "Rock Paper Scissors",
    description: "Challenge the machine. Choose wisely.",
    emoji: "✊",
    color: "#f472b6",
    preview: <RockPaperScissorsPreview />,
  },
  {
    key: "wordle",
    path: "/wordle",
    name: "Wordle",
    description: "Guess the word. Six chances only.",
    emoji: "📝",
    color: "#fbbf24",
    preview: <WordlePreview />,
  },
  {
    key: "tic-tac-toe",
    path: "/tic-tac-toe",
    name: "Tic Tac Toe",
    description: "Three in a row. Classic never dies.",
    emoji: "⬛",
    color: "#818cf8",
    preview: <TicTacToePreview />,
  },
  {
    key: "trivia",
    path: "/trivia",
    name: "Trivia",
    description: "Test your knowledge. Beat the clock.",
    emoji: "🧠",
    color: "#34d399",
    preview: <TriviaPreview />,
  },
  {
    key: "pokemon",
    path: "/pokemon",
    name: "Pokemon",
    description: "Reveal the image. Guess what's hiding.",
    emoji: "🖼️",
    color: "#c084fc",
    preview: (isActive) => <HiddenPicturePreview isActive={isActive} />,
  },
];
