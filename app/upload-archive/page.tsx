"use client";

import React, { useState } from "react";
import { processArchive } from "./processArchive";

export default function UploadArchivePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Lütfen Instagram arşiv ZIP dosyasını seçin.");
      return;
    }

    setLoading(true);

    try {
      const result = await processArchive(selectedFile);

      console.log("ZIP içeriği ayrıştırıldı:", result);

      alert("Arşiv başarıyla çözüldü! Analiz ekranına yönlendiriliyorsunuz...");

      window.location.href = "/analysis/results?data=ok";
    } catch (error) {
      alert("Arşiv okunurken bir hata oluştu. ZIP formatının doğru olduğundan emin olun.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        maxWidth: 600,
        margin: "80px auto",
        textAlign: "center",
        padding: 20,
      }}
    >
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
        disabled={loading}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          borderRadius: 6,
          background: loading ? "#777" : "black",
          color: "white",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Yükleniyor..." : "Arşivi Yükle"}
      </button>

      {selectedFile && (
        <p style={{ marginTop: 15, fontSize: 14, opacity: 0.8 }}>
          Seçilen dosya: {selectedFile.name}
        </p>
      )}
    </main>
  );
}
