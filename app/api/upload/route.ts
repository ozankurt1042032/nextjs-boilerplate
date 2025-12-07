import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: "R2",
    secretAccessKey: process.env.CLOUDFLARE_R2_TOKEN!,
  },
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Dosya bulunamadı" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileName = `archive_${Date.now()}.zip`;

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET!,
        Key: fileName,
        Body: buffer,
        ContentType: "application/zip",
      })
    );

    return NextResponse.json({
      message: "Yükleme başarılı",
      url: `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${fileName}`,
    });
  } catch (error) {
    console.error("UPLOAD API HATASI:", error);
    return NextResponse.json({ error: "Yükleme hatası" }, { status: 500 });
  }
}
