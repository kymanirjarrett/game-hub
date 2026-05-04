function safeLocalStorageJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) ?? fallback;
  } catch {
    return fallback;
  }
}

import { GameSection } from "./components/GameSection";
import { HighScoresSection } from "./components/HighScoresSection";
import { PlayerInfoCard } from "./components/PlayerInfoCard";
import "../../styles/RPS.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function RPSGame() {
  const settings = safeLocalStorageJSON("rpsSettings", {});
  const navigate = useNavigate();
  const playerName = sessionStorage.getItem("playerName") || "Player";
  const playerAvatar = sessionStorage.getItem("playerAvatar") || "assassin";
  const difficulty = settings?.difficulty || "normal";

  const [highScore, setHighScore] = useState(
    () => safeLocalStorageJSON("rpsHighScore", null),
  );

  const handleGameReset = (finalScore) => {
    if (finalScore.player === 0) return;

    if (highScore && finalScore.player <= highScore.score) return;

    const newEntry = {
      name: playerName,
      score: finalScore.player,
      date: new Date().toISOString(),
    };

    setHighScore(newEntry);
    localStorage.setItem("rpsHighScore", JSON.stringify(newEntry));
  };

  const handleClearHighScore = () => {
    localStorage.removeItem("rpsHighScore");
    setHighScore(null);
  };

  return (
    <main className="rps-main">
      <header>
        <h2>Rock Paper Scissors</h2>
        <nav>
          <button
            type="button"
            className="nav-link"
            onClick={() => navigate("/")}
          >
            ← Back to Lobby
          </button>
        </nav>
      </header>
      <PlayerInfoCard playerName={playerName} playerAvatar={playerAvatar} />
      <GameSection difficulty={difficulty} onGameReset={handleGameReset} />
      <HighScoresSection highScore={highScore} onClear={handleClearHighScore} />
    </main>
  );
}
