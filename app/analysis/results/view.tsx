"use client";

import { useSearchParams } from "next/navigation";

export default function ResultView() {
  const params = useSearchParams();
  const user = params.get("user");

  return (
    <div style={{ textAlign: "center", marginTop: 60 }}>
      <h1>Takipçi Analizi</h1>
      <p>Analiz edilen hesap: {user}</p>
      <p>Sonuçlar hazırlanıyor...</p>
    </div>
  );
}
