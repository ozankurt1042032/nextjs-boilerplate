"use client";

import { useState } from "react";

export default function UploadJSONPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (!file) return alert("JSON dosyası seç");
    const text = await file.text();
    const json = JSON.parse(text);

    alert("JSON başarıyla okundu. Analiz modülüne eklenebilir.");
    console.log(json);
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto" }}>
      <h1>JSON Veri Yükle (Gelişmiş)</h1>
      <p style={{ opacity: 0.7 }}>
        Eğer veriyi dışarıdan bir araçla aldıysan, JSON formatında yükleyerek analiz edebilirsin.
      </p>

      <input
        type="file"
        accept="application/json"
        style={{ marginTop: 20 }}
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />

      <button
        onClick={handleSubmit}
        style={{ marginTop: 20, padding: 10, borderRadius: 8 }}
      >
        JSON'ı Oku
      </button>
    </div>
  );
}
