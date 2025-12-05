"use client";

import { useState } from "react";

export default function UploadPage() {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        textAlign: "center",
        padding: "20px"
      }}
    >
      <h1 style={{ fontSize: "2.4rem", fontWeight: 700 }}>
        Instagram Ekran Kaydı Yükle
      </h1>

      <p style={{ fontSize: "1.1rem", maxWidth: "650px", marginTop: "10px" }}>
        Aşağıdaki adımları takip ederek Instagram takipçi listenizin ekran
        kaydını alın ve videoyu buraya yükleyin. Şimdilik sadece videoyu alıp adını
        göstereceğiz. Bir sonraki adımda bu videodan takipçi listesini okuyup analiz kısmını
        ekleyeceğiz.
      </p>

      <div style={{ textAlign: "left", maxWidth: "650px", marginTop: "20px" }}>
        <p>📌 Telefonunuzdan Instagram uygulamasını açın.</p>
        <p>📌 Profilinize girip <b>Takipçiler</b> ekranına gelin.</p>
        <p>📌 Telefonunuzun bildirim merkezinden <b>ekran kaydını başlatın.</b></p>
        <p>
          📌 Takipçi listesini <b>yavaşça aşağı kaydırın</b>. Çok hızlı kaydırmayın,
          isimler okunamayabilir.
        </p>
        <p>
          📌 Listenin sonuna geldiğinizde kaydı durdurup videoyu galerinize kaydedin.
        </p>
        <p>📌 Aşağıdaki alandan bu videoyu yükleyin.</p>
      </div>

      {/* Video seçme alanı */}
      <label
  htmlFor="videoUpload"
  style={{
    marginTop: "30px",
    background: "#000",
    color: "#fff",
    padding: "14px 28px",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    display: "inline-block"
  }}
>
  📁 Ekran Kaydını Seç
</label>

<input
  id="videoUpload"
  type="file"
  accept="video/*"
  onChange={(e) => setSelectedVideo(e.target.files?.[0] || null)}
  style={{ display: "none" }}
/>
{selectedVideo && (
  <p
    style={{
      marginTop: "14px",
      fontSize: "1rem",
      padding: "10px 18px",
      background: "#f7f7f7",
      borderRadius: "10px",
      border: "1px solid #ddd",
      width: "fit-content",
      color: "#333"
    }}
  >
    📌 Seçilen video: <b>{selectedVideo.name}</b>
  </p>
)}


      {/* Seçilen video adı */}
      {selectedVideo && (
        <p style={{ marginTop: "15px", fontSize: "1rem", fontWeight: 600 }}>
          Seçilen video: {selectedVideo.name}
        </p>
      )}

      {/* Upload Button */}
      <button
        style={{
          marginTop: "25px",
          background: "#000",
          color: "#fff",
          padding: "14px 28px",
          borderRadius: "8px",
          fontSize: "1rem",
          cursor: "pointer"
        }}
        onClick={async () => {
          if (!selectedVideo) {
            alert("Lütfen önce bir video seçin.");
            return;
          }

          const formData = new FormData();
          formData.append("file", selectedVideo);

          try {
            const res = await fetch("/api/upload", {
              method: "POST",
              body: formData,
            });

            const data = await res.json();

            alert("Video başarıyla yüklendi: " + data.fileName);
          } catch (error) {
            console.error(error);
            alert("Yükleme sırasında bir hata oluştu.");
          }
        }}
      >
        Analizi Başlat
      </button>

      <footer
        style={{
          marginTop: "60px",
          fontSize: "0.9rem",
          opacity: 0.6
        }}
      >
        © 2025 Takipçi Analizi
      </footer>
    </main>
  );
}
