"use client";

import { useEffect, useState } from "react";

export default function Process() {
  const [status, setStatus] = useState("Video işleniyor...");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("Kare çıkarma başlıyor...");
    }, 2000);

    const timer2 = setTimeout(() => {
      setStatus("Kareler OCR için hazırlanıyor...");
    }, 5000);

    const timer3 = setTimeout(() => {
      setStatus("Rapor hazırlanıyor...");
    }, 8000);

    const timer4 = setTimeout(() => {
      setStatus("Bitti ✔ Rapor hazırlanıyor...");
      window.location.href = "/"; // burası rapor sayfası olacak
    }, 12000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <main
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
      <h1 style={{ fontSize: "2.3rem", fontWeight: 600 }}>
        Video İşleniyor 🔍
      </h1>

      <p style={{ marginTop: "25px", fontSize: "1.2rem" }}>{status}</p>

      <p style={{ marginTop: "40px", opacity: 0.6 }}>
        Sayfayı kapatmayın. İşlem tamamlanınca otomatik yönlendirme olacaktır.
      </p>
    </main>
  );
}
