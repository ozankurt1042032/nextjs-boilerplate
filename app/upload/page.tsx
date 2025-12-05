"use client";

import { useState } from "react";

export default function UploadPage() {
  const [video, setVideo] = useState<File | null>(null);

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

      <p style={{ fontSize: "1rem", maxWidth: "600px", opacity: 0.8 }}>
        Takipçi ekranının kayıt videosunu yükleyin.
      </p>

      <label
        htmlFor="videoUpload"
        style={{
          marginTop: "25px",
          background: "#000",
          color: "#fff",
          padding: "14px 28px",
          borderRadius: "8px",
          cursor: "pointer"
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

      {video && (
        <p
          style={{
            marginTop: "14px",
            fontSize: "1rem",
            padding: "10px 18px",
            background: "#f7f7f7",
            borderRadius: "10px",
            border: "1px solid #ddd",
            width: "fit-content"
          }}
        >
          📌 Seçilen video: <b>{video.name}</b>
        </p>
      )}

      {video && (
        <button
          style={{
            marginTop: "25px",
            background: "#000",
            color: "#fff",
            padding: "14px 28px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
          onClick={async () => {
            const formData = new FormData();
            formData.append("video", video as Blob);

            await fetch("/api/process", {
              method: "POST",
              body: formData
            });

            window.location.href = "/process";
          }}
        >
          Analizi Başlat
        </button>
      )}
    </main>
  );
}
