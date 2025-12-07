"use client";
import { useState } from "react";

export default function UploadArchivePage() {
  const [status, setStatus] = useState("");

  async function handleUpload(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    setStatus("Yükleniyor...");

    const formData = new FormData();
    formData.append("file", file);

    const upload = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await upload.json();

    if (result.url) {
      setStatus(`Yüklendi! Dosya linki: ${result.url}`);
    } else {
      setStatus("Hata oluştu!");
    }
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Instagram Veri Arşivini Yükle</h1>
      <p style={{ marginTop: 10, opacity: 0.7 }}>
        Instagram → Settings → Privacy → Download Data üzerinden indirilen ZIP dosyasını yükleyin.
      </p>

      <input
        type="file"
        accept=".zip"
        style={{ marginTop: 20 }}
        onChange={handleUpload}
      />

      <p style={{ marginTop: 20 }}>{status}</p>
    </div>
  );
}
