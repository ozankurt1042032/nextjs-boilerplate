"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Tutorial() {
  const steps = [
    "Instagram profilinize girin.",
    "Takipçiler bölümünü açın.",
    "Ekran kaydını başlatın.",
    "Listeyi yavaşça aşağı kaydırın.",
    "Sonuna geldiğinizde kaydı durdurun.",
    "Videoyu yükleyerek analizi başlatın."
  ];

  const router = useRouter();
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < steps.length - 1) setCurrent(current + 1);
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const finish = () => {
    localStorage.setItem("tutorialDone", "true");
    router.push("/upload");
  };

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
        padding: "20px",
      }}
    >
      <div style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
        {steps[current]}
      </div>

      <div style={{ marginTop: "40px" }}>
        <span>{current + 1}</span> / <span>{steps.length}</span>
      </div>

      <div style={{ marginTop: "30px", display: "flex", gap: "20px" }}>
        {current > 0 && (
          <button onClick={prev} style={buttonStyle}>
            Geri
          </button>
        )}
        {current < steps.length - 1 && (
          <button onClick={next} style={buttonStyle}>
            İleri
          </button>
        )}
        {current === steps.length - 1 && (
          <button onClick={finish} style={buttonStyle}>
            Anladım, devam et
          </button>
        )}
      </div>

      <button
        onClick={() => router.push("/upload")}
        style={{ marginTop: "50px", opacity: 0.6 }}
      >
        Rehberi tekrar gösterme
      </button>
    </main>
  );
}

const buttonStyle = {
  background: "#000",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "8px",
  cursor: "pointer",
};
