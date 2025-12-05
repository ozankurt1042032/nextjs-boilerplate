import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function POST() {
  try {
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    // Yüklenmiş video burada duruyor mu kontrol et
    const files = fs.readdirSync(uploadsDir);
    const video = files.find((f) => f.endsWith(".mp4"));

    if (!video) {
      return NextResponse.json({ error: "Video bulunamadı" }, { status: 400 });
    }

    console.log("İşlem başlıyor →", video);

    // *** Şimdilik SADECE DEMO simülasyonu ***
    // Buraya asıl kare okuma, OCR, takipçi ayıklama eklenecek
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // DEMO ÇIKTI – şimdilik örnek isim listesi verelim
    const fakeFollowers = [
      "mehmet_123",
      "ayse.kara",
      "dogukan.dev",
      "elif_xx",
      "mert.gunay"
    ];

    return NextResponse.json(
  {
    done: true,
    redirect: "/report",
    followers: fakeFollowers
  },
  { status: 200 }
);

  } catch (e) {
    console.log("Hata process:", e);
    return NextResponse.json({ error: "İşlem hatası" }, { status: 500 });
  }
}
