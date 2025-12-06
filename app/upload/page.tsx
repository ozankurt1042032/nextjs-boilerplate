// app/upload/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [selectedName, setSelectedName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setSelectedName(f?.name || "");
  };

  const handleUpload = async () => {
    if (!file) return alert("Lütfen bir video seçin");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        console.error("UPLOAD STATUS:", uploadRes.status);
        alert("Video yüklenirken hata oluştu. Lütfen tekrar deneyin.");
        setLoading(false);
        return;
      }

      const result = await uploadRes.json().catch((e) => {
        console.error("JSON PARSE HATASI:", e);
        return null;
      });

      if (result?.message === "ok") {
        router.push("/process");
      } else {
        alert("Video yüklenirken hata oluştu. Tekrar deneyin.");
      }
    } catch (e) {
      console.error("UPLOAD HATASI:", e);
      alert("Beklenmeyen bir hata oluştu. Biraz sonra tekrar deneyin.");
    } finally {
      setLoading(false);
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
        disabled={loading}
        style={{
          marginTop: "30px",
          background: loading ? "#777" : "#1a73e8",
          color: "#fff",
          padding: "14px 28px",
          borderRadius: "8px",
          fontSize: "1rem",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Yükleniyor..." : "Videoyu Yükle ve İşlemeye Başla"}
      </button>
    </main>
  );
}
