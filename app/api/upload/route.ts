import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const R2_BUCKET = process.env.R2_BUCKET!;
    const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;
    const R2_ACCESS_KEY = process.env.R2_ACCESS_KEY!;
    const R2_SECRET_KEY = process.env.R2_SECRET_KEY!;

    const uploadUrl = `https://${R2_BUCKET}.${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${file.name}`;

    const upload = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
        "Content-Length": buffer.length.toString(),
        Authorization:
          "AWS " +
          R2_ACCESS_KEY +
          ":" +
          R2_SECRET_KEY,
      },
      body: buffer,
    });

    if (!upload.ok) {
      return NextResponse.json(
        { error: "Cloudflare R2 yükleme hatası" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, url: uploadUrl });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return NextResponse.json(
      { error: "Yükleme sırasında sunucu hatası oluştu" },
      { status: 500 }
    );
  }
}
