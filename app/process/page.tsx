"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProcessPage() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      const res = await fetch("/api/process", { method: "POST" });
      const data = await res.json();

      if (data?.followers) {
        localStorage.setItem("followers", JSON.stringify(data.followers));
        router.push("/result");
      } else {
        alert("Bir hata oluştu, tekrar deneyin.");
      }
    };

    run();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        fontFamily: "sans-serif",
        textAlign: "center"
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: 700 }}>
        Video İşleniyor 🔍
      </h1>
      <p style={{ fontSize: "1.2rem", maxWidth: "650px" }}>
        Lütfen bekleyin. Takipçi listeniz videodan okunuyor.
      </p>
      <p style={{ opacity: 0.6, marginTop: "50px" }}>
        📌 Sayfayı kapatmayın, işlem bitince otomatik rapora yönlendirileceksiniz.
      </p>
    </div>
  );
}
