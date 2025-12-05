"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProcessPage() {
  const router = useRouter();

  useEffect(() => {
    const handle = async () => {
      const res = await fetch("/api/process", { method: "POST" });
      const data = await res.json();

      if (data?.redirect) {
        router.push(data.redirect);
      }
    };

    handle();
  }, [router]);

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
      <h1 style={{ fontSize: "3rem" }}>Video İşleniyor 🔍</h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "600px", marginTop: "10px" }}>
        Lütfen bekleyin, takipçi listeniz analiz ediliyor...
      </p>
      <span style={{ fontSize: "3rem", marginTop: "30px" }}>⏳</span>
      <p style={{ marginTop: "80px", fontSize: "1rem", opacity: 0.6 }}>
        Bu işlem birkaç saniye sürebilir, sayfayı kapatmayın.
      </p>
    </main>
  );
}
