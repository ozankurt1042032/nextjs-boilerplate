"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [selectedName, setSelectedName] = useState("");
  const router = useRouter();

  const handleFile = (e: any) => {
    const f = e.target.files[0];
    setFile(f);
    setSelectedName(f?.name || "");
  };

  const handleUpload = async () => {
    if (!file) return alert("Lütfen bir video seçin");

    const formData = new FormData();
    formData.append("file", file);

    // Videoyu backend'e yükleme işlemi
    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const result = await uploadRes.json();

    if (result?.message === "ok") {
      // Videoyu yükledikten sonra otomatik işlem sayfasına geç
      router.push("/process");
    } else {
      alert("Video yüklenirken hata oluştu. Tekrar deneyin.");
    }
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px" }}>
        Instagram Ekran Kaydı Yükle
      </h1>

      <p style={{ maxWidth: "650px", fontSize: "1.1rem", lineHeight: "1.6" }}>
        Aşağıdaki adımları takip ederek takipçi listenizin ekran kaydını yükleyin.
      </p>

      <label
        htmlFor="video"
        style={{
          marginTop: "40px",
          background: "#000",
          color: "#fff",
          padding: "14px 30px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        Ekran Kaydını Seç
      </label>

      <input
        id="video"
        type="file"
        accept="video/*"
        onChange={handleFile}
        style={{ display: "none" }}
      />

      {selectedName && (
        <p style={{ marginTop: "15px", color: "green", fontWeight: 500 }}>
          Seçilen video: {selectedName}
        </p>
      )}

      <button
        onClick={handleUpload}
        style={{
          marginTop: "30px",
          background: "#1a73e8",
          color: "#fff",
          padding: "14px 28px",
          borderRadius: "8px",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        Videoyu Yükle ve İşlemeye Başla
      </button>
    </main>
  );
}
