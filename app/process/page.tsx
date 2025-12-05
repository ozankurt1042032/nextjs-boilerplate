"use client";

import { useEffect, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";

export default function Process() {
  const [status, setStatus] = useState("Videonuz işleniyor...");

  useEffect(() => {
    const run = async () => {
      try {
        setStatus("Video yükleniyor...");

        const ffmpeg = new FFmpeg();
        await ffmpeg.load();

        setStatus("Video alınıyor...");

        // localStorage’dan videoyu çek
        const videoDataURL = localStorage.getItem("video");
        if (!videoDataURL) {
          setStatus("Hata: video bulunamadı.");
          return;
        }

        const video = new Uint8Array(
          await (await fetch(videoDataURL)).arrayBuffer()
        );

        await ffmpeg.writeFile("input.mp4", video);

        setStatus("Video karelere ayrılıyor...");

        // her saniyede 1 kare çıkar
        await ffmpeg.exec(["-i", "input.mp4", "-vf", "fps=1", "frame_%03d.png"]);

        setStatus("Kare çıkarma tamamlandı ✔");

        // örnek olarak ilk kareyi al
        const frame = await ffmpeg.readFile("frame_001.png");

        // Bu aşamada OCR eklenecek (sonraki adım)
        console.log("Frame yakalandı:", frame);

        alert("frame çıkarma tamam");

      } catch (error) {
        console.error(error);
        setStatus("İşlem sırasında hata oluştu ❌");
      }
    };

    run();
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

      <p style={{ fontSize: "1.2rem", maxWidth: "600px", marginTop: "10px" }}>
        Lütfen bekleyin, ekran kaydından takipçi listeniz çıkarılıyor.
      </p>
