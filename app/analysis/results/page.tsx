"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ResultsPage() {
  const params = useSearchParams();
  const fileKey = params.get("fileKey");

  const [status, setStatus] = useState("Analiz başlatılıyor...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fileKey) {
      setError("Dosya anahtarı bulunamadı");
      return;
    }

    async function startAnalyse() {
      try {
        const res = await fetch("/api/analyse", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileKey }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Analiz başarısız");
        }

        setStatus("Analiz tamamlandı (demo)");
      } catch (err: any) {
        console.error(err);
        setError("Analiz sırasında hata oluştu");
      }
    }

    startAnalyse();
  }, [fileKey]);

  if (error) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Hata</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Analiz Sonuçları</h1>
      <p>{status}</p>

      <hr />

      <p>
        <strong>Video Anahtarı:</strong>
        <br />
        {fileKey}
      </p>
    </div>
  );
}
