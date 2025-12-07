"use client";

import React, { useState } from "react";

export default function UploadArchivePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert("Lütfen Instagram arşiv ZIP dosyasını seçin.");
      return;
    }

    alert("Dosya alındı, analiz için işlenecek 👌");
  };

  return (
    <main style={{ maxWidth: 600, margin: "80px auto", textAlign: "center" }}>
      <h1>Instagram Veri Arşivini Yükle</h1>

      <p style={{ marginTop: 10, opacity: 0.7 }}>
        Instagram &gt; Settings &gt; Privacy &gt; Download Data üzerinden indirilen ZIP dosyasını yükleyin.
      </p>

      <input
        type="file"
        accept=".zip"
        onChange={handleFileSelect}
        style={{ marginTop: 30 }}
      />

      <button
        onClick={handleUpload}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          borderRadius: 6,
          background: "black",
          color: "white",
          cursor: "pointer",
        }}
      >
        Arşivi Yükle
      </button>

      {selectedFile && (
        <p style={{ marginTop: 15, fontSize: 14, opacity: 0.8 }}>
          Seçilen dosya: {selectedFile.name}
        </p>
      )}
    </main>
  );
}
