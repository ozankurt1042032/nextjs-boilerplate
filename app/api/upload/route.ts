// app/api/upload/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Dosya yok" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, "video.mp4");
    fs.writeFileSync(filePath, buffer);

    console.log("Video kaydedildi:", filePath);

    return NextResponse.json({ message: "ok" });
  } catch (e) {
    console.error("UPLOAD API HATASI:", e);
    return NextResponse.json(
      { error: "Upload sırasında hata oluştu" },
      { status: 500 }
    );
  }
}
