import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { HomePage } from "./pages/HomePage";
import { RockPaperScissors } from "./pages/RockPaperScissors";
import { TicTacToe } from "./pages/TicTacToe";
import { Trivia } from "./pages/Trivia";
import { Wordle } from "./pages/Wordle";
import Pokemon from "./pages/Pokemon";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/rps", element: <RockPaperScissors /> },
        { path: "/tic-tac-toe", element: <TicTacToe /> },
        { path: "/trivia", element: <Trivia /> },
        { path: "/wordle", element: <Wordle /> },
        { path: "/pokemon", element: <Pokemon /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);
