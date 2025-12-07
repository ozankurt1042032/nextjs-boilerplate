export default function MetaConnectPage() {
  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Meta Business / Creator Bağlantısı</h1>
      <p style={{ marginTop: 10, opacity: 0.7 }}>
        Instagram Business veya Creator hesabınızı resmi Meta API ile bağlayarak
        detaylı performans ve takipçi istatistikleri elde edebilirsiniz.
      </p>

      <p style={{ marginTop: 20 }}>
        Bu yöntem tamamen resmi olup Instagram/Meta SDK üzerinden OAuth doğrulaması gerektirir.
      </p>

      <button
        style={{
          marginTop: 30,
          padding: "10px 18px",
          borderRadius: 8,
          border: "none",
          background: "#0866FF",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Meta ile Bağlan
      </button>
    </div>
  );
}
