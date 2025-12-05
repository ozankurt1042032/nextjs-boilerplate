export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        textAlign: "center"
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: 700 }}>
        Takipçi Analizi
      </h1>

      <p style={{ fontSize: "1.2rem", maxWidth: "600px" }}>
        Instagram takipçi analiz aracına hoş geldiniz.<br />
        Takipten çıkanlar, gizleyenler, sahte hesaplar ve çok daha fazlası.
      </p>

      <button
        style={{
          marginTop: "30px",
          background: "#000",
          color: "#fff",
          padding: "15px 30px",
          borderRadius: "8px",
          fontSize: "1rem",
          cursor: "pointer"
        }}
      >
        Analizi Başlat
      </button>

      <footer style={{ marginTop: "80px", fontSize: "0.9rem", opacity: 0.6 }}>
        © 2025 Takipçi Analizi
      </footer>
    </main>
  );
}
