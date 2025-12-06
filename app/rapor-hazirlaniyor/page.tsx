// app/rapor-hazirlaniyor/page.tsx
export default function RaporHazirlaniyorPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2.2rem", marginBottom: "10px" }}>
        Rapor Hazırlanıyor
      </h1>
      <p style={{ fontSize: "1.1rem", maxWidth: "520px", lineHeight: 1.5 }}>
        Ekran kaydını başarıyla aldık. Takipçi listeniz analiz ediliyor.
        <br />
        Bir sonraki adımda, takipçi listenizi detaylı olarak gösteren sayfayı
        hazırlayacağız.
      </p>
    </main>
  );
}
