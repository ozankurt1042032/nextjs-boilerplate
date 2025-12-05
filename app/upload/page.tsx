"use client";

import { useState } from "react";

export default function UploadPage() {
  const [videoName, setVideoName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoName(file.name);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px 20px",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "10px" }}>
        Instagram Ekran Kaydı Yükle
      </h1>

      <p style={{ maxWidth: "600px", fontSize: "0.95rem", opacity: 0.8 }}>
        Aşağıdaki adımları takip ederek Instagram takipçi listenizin ekran
        kaydını alın ve videoyu buraya yükleyin. Şimdilik sadece videoyu
        alıp kaydın adını göstereceğiz. Bir sonraki adımda bu videodan
        takipçi listesini okuyup analiz kısmını ekleyeceğiz.
      </p>

      <div
        style={{
          marginTop: "25px",
          textAlign: "left",
          maxWidth: "500px",
          fontSize: "0.95rem",
          lineHeight: 1.5,
        }}
      >
        <ol>
          <li>Telefonunuzdan Instagram uygulamasını açın.</li>
          <li>Profilinize girip <b>Takipçiler</b> (veya <b>Takip Edilenler</b>) ekranına gelin.</li>
          <li>
            Telefonunuzun bildirim / kontrol panelinden{" "}
            <b>ekran kaydını başlatın</b>.
          </li>
          <li>
            Takipçi listesini <b>yavaşça aşağı kaydırın</b>. Çok hızlı
            kaydırmayın.
          </li>
          <li>
            Listenin sonuna geldiğinizde ekran kaydını durdurun ve videoyu
            galerinize kaydedin.
          </li>
          <li>Aşağıdaki alandan bu videoyu seçip yükleyin.</li>
        </ol>
      </div>

      <label
        style={{
          marginTop: "30px",
          background: "#000",
          color: "#fff",
          padding: "12px 24px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "0.95rem",
        }}
      >
        Ekran Kaydını Seç
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </label>

      {videoName && (
        <p style={{ marginTop: "15px", fontSize: "0.9rem" }}>
          Seçilen video: <b>{videoName}</b>
        </p>
      )}

      <p
        style={{
          marginTop: "40px",
          fontSize: "0.8rem",
          maxWidth: "500px",
          opacity: 0.7,
        }}
      >
        Not: Şu anda bu sayfa sadece videoyu alıp kaydın adını göstermek için
        hazırlanmıştır. Bir sonraki adımda bu videodan takipçi isimleri
        okunacak ve önceki liste ile karşılaştırılarak “takipten çıkanlar”,
        “yeni takip edenler” gibi raporlar gösterilecek.
      </p>
    </main>
  );
}
