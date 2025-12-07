"use client";

import { useState } from "react";

export default function UploadArchivePage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async () => {
    if (!file) return alert("Dosya seçmelisin");

    const form = new FormData();
    form.append("archive", file);

    const res = await fetch("/api/upload-archive", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto" }}>
      <h1>Instagram Veri Arşivini Yükle</h1>
      <p style={{ marginTop: 10, opacity: 0.7 }}>
        Instagram > Settings > Privacy > Download Data üzerinden indirilen ZIP dosyasını yükleyin.
      </p>

      <input
        type="file"
        accept=".zip,.json"
        style={{ marginTop: 20 }}
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      <button
        onClick={handleSubmit}
        style={{
          marginTop: 20,
          padding: 10,
          borderRadius: 8,
          background: "#000",
          color: "#fff",
        }}
      >
        Analizi Başlat
      </button>

      {result && (
        <pre style={{ marginTop: 30, padding: 20, background: "#fafafa" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
