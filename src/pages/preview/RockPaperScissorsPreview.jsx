export function RockPaperScissorsPreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        gap: "1.5rem",
      }}
    >
      <div style={{ display: "flex", gap: "2rem", fontSize: "5rem" }}>
        <span style={{ animation: "float 2s ease-in-out infinite" }}>✊</span>
        <span style={{ animation: "float 2s ease-in-out infinite 0.3s" }}>
          ✋
        </span>
        <span style={{ animation: "float 2s ease-in-out infinite 0.6s" }}>
          ✌️
        </span>
      </div>
      <p
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          color: "#f472b6",
          letterSpacing: "0.2em",
          fontSize: "1rem",
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        Rock · Paper · Scissors
      </p>
    </div>
  );
}
