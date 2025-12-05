export default function Process() {
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
      <h1 style={{ fontSize: "2.5rem", fontWeight: 600 }}>
        Video İşleniyor 🔍
      </h1>

      <p style={{ fontSize: "1.2rem", maxWidth: "600px", marginTop: "20px" }}>
        Lütfen bekleyin. Takipçi listeniz karelere ayrılıyor ve okunuyor.
        Bu işlem videonun uzunluğuna göre birkaç dakika sürebilir.
      </p>

      <p style={{ marginTop: "40px", fontSize: "1rem", opacity: 0.7 }}>
        📌 Sayfayı kapatmayın, işlem bitince otomatik olarak rapora yönlendirileceksiniz.
      </p>
    </main>
  );
}
