import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const video = formData.get("video") as File;

    if (!video) {
      return NextResponse.json({ error: "Video yok" }, { status: 400 });
    }

    const bytes = await video.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(process.cwd(), "public", "upload.mp4");

    await writeFile(filePath, buffer);

    return NextResponse.json({
      status: "ok",
      message: "Video sunucuya kaydedildi ✔",
      filePath: "/upload.mp4"
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "İşlem hatası" }, { status: 500 });
  }
}
