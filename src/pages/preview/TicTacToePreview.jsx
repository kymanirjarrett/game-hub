export function TicTacToePreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        gap: "1rem",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 70px)",
          gridTemplateRows: "repeat(3, 70px)",
          gap: "8px",
        }}
      >
        {["X", "O", "X", "", "X", "O", "O", "", "X"].map((cell, i) => (
          <div
            key={i}
            style={{
              width: 70,
              height: 70,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(129,140,248,0.08)",
              border: "1px solid rgba(129,140,248,0.25)",
              borderRadius: 8,
              fontSize: "1.8rem",
              fontFamily: "'Orbitron', sans-serif",
              color: cell === "X" ? "#818cf8" : "#f472b6",
              fontWeight: 700,
            }}
          >
            {cell}
          </div>
        ))}
      </div>
      <p
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          color: "#818cf8",
          letterSpacing: "0.2em",
          fontSize: "1rem",
          textTransform: "uppercase",
          margin: 0,
        }}
      >
        Tic · Tac · Toe
      </p>
    </div>
  );
}
