export function TriviaPreview() {
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
        padding: "2rem",
      }}
    >
      <div style={{ fontSize: "4rem" }}>🧠</div>
      <div
        style={{
          background: "rgba(52,211,153,0.08)",
          border: "1px solid rgba(52,211,153,0.3)",
          borderRadius: 10,
          padding: "1rem 1.5rem",
          textAlign: "center",
          width: "100%",
          maxWidth: 320,
        }}
      >
        <p
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            color: "#34d399",
            fontSize: "1.1rem",
            margin: 0,
            fontWeight: 600,
          }}
        >
          What is the capital of France?
        </p>
      </div>
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {["Paris", "Berlin", "Rome", "Madrid"].map((opt, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              fontSize: "0.9rem",
              padding: "0.4rem 1rem",
              borderRadius: 6,
              background:
                i === 0 ? "rgba(52,211,153,0.2)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${
                i === 0 ? "rgba(52,211,153,0.5)" : "rgba(255,255,255,0.1)"
              }`,
              color: i === 0 ? "#34d399" : "#94a3b8",
              fontWeight: 600,
            }}
          >
            {opt}
          </span>
        ))}
      </div>
    </div>
  );
}
