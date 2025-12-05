"use client";

import { useState } from "react";

export default function UploadPage() {
  const [video, setVideo] = useState<File | null>(null);

  const handleAnalyze = async () => {
    if (!video) {
      alert("Lütfen önce video seçin");
      return;
    }

    // önce kullanıcıyı /process sayfasına yönlendir
    window.location.href = "/process";

    // backend'e arka planda gönderim
    const formData = new FormData();
    formData.append("video", video);

    fetch("/api/process", {
      method: "POST",
      body: formData,
    }).catch(() => console.log("Arka plan yükleme hatası"));
  };

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
      }}
    >
      <h1 style={{ fontSize: "2.4rem", fontWeight: 700 }}>
        Instagram Ekran Kaydı Yükle
      </h1>

      <p style={{ fontSize: "1.1rem", maxWidth: "650px", marginTop: "10px" }}>
        Instagram takipçi ekranını kaydedip buraya yükleyin.
      </p>

      {/* BUTON GÖRÜNÜMÜ OLAN SEÇME */}
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
        }}
      >
        📁 Ekran Kaydını Seç
      </label>

      <input
        id="videoUpload"
        type="file"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files?.[0] || null)}
        style={{ display: "none" }}
      />

      {/* SEÇİLEN VİDEO GÖSTERİMİ */}
      {video && (
        <p
          style={{
            marginTop: "14px",
            fontSize: "1rem",
            padding: "10px 18px",
            background: "#f7f7f7",
            borderRadius: "10px",
            border: "1px solid #ddd",
            width: "fit-content",
          }}
        >
          📌 Seçilen video: <b>{video.name}</b>
        </p>
      )}

      {/* ANALİZ TUŞU */}
      {video && (
        <button
          onClick={handleAnalyze}
          style={{
            marginTop: "25px",
            background: "#000",
            color: "#fff",
            padding: "14px 28px",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Analizi Başlat
        </button>
      )}
    </main>
  );
}
