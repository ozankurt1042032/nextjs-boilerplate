// app/process/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProcessPage() {
  const router = useRouter();
  const [message, setMessage] = useState("İşlem başlatılıyor...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        setMessage("Video işleniyor, lütfen bekleyin...");

        const res = await fetch("/api/process", {
          method: "POST",
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("API hata kodu: " + res.status);
        }

        const data = await res.json();

        if (data?.redirect) {
          setMessage("Takipçi listesi işleme alındı, yönlendiriliyorsunuz...");
          router.push(data.redirect);
        } else {
          setError("API'den yönlendirme bilgisi gelmedi.");
        }
      } catch (e: any) {
        console.error("PROCESS HATASI:", e);
        setError("İşlem sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
      }
    };

    run();
  }, [router]);

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
        Takipçi Listesi İşleniyor
      </h1>

      {!error ? (
        <>
          <p style={{ fontSize: "1.1rem", maxWidth: "500px", marginBottom: "20px" }}>
            {message}
          </p>
          <p style={{ opacity: 0.6, fontSize: "0.95rem" }}>
            Bu işlem ekran kaydınızın uzunluğuna göre birkaç saniye sürebilir.
          </p>
        </>
      ) : (
        <>
          <p style={{ color: "red", fontWeight: 600, marginBottom: "10px" }}>
            {error}
          </p>
          <button
            onClick={() => router.push("/upload")}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              background: "#000",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Tekrar Dene
          </button>
        </>
      )}
    </main>
  );
}
