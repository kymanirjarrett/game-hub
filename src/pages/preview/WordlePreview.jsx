export function WordlePreview() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        gap: "0.6rem",
      }}
    >
      {[
        ["C", "R", "A", "N", "E"],
        ["S", "L", "A", "T", "E"],
        ["W", "O", "R", "D", "S"],
      ].map((row, ri) => (
        <div key={ri} style={{ display: "flex", gap: "6px" }}>
          {row.map((l, ci) => {
            const colors = [
              ["#6b7280", "#fbbf24", "#6b7280", "#34d399", "#6b7280"],
              ["#6b7280", "#6b7280", "#fbbf24", "#6b7280", "#34d399"],
              ["#34d399", "#34d399", "#34d399", "#34d399", "#34d399"],
            ];
            return (
              <div
                key={ci}
                style={{
                  width: 52,
                  height: 52,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: colors[ri][ci] + "22",
                  border: `2px solid ${colors[ri][ci]}`,
                  borderRadius: 6,
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: colors[ri][ci],
                }}
              >
                {l}
              </div>
            );
          })}
        </div>
      ))}
      <p
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          color: "#fbbf24",
          letterSpacing: "0.2em",
          fontSize: "0.9rem",
          textTransform: "uppercase",
          marginTop: "0.5rem",
        }}
      >
        Wordle
      </p>
    </div>
  );
}
