import { NextResponse } from "next/server";
import crypto from "crypto";

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID!;
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;
const BUCKET_NAME = process.env.R2_BUCKET_NAME!;

export async function POST() {
  try {
    const fileName = `videos/${crypto.randomUUID()}.mp4`;

    const date = new Date().toISOString().replace(/[:-]|\.\d{3}/g, "");
    const credentialScope = `${date.slice(0, 8)}/auto/s3/aws4_request`;

    const host = `${ACCOUNT_ID}.r2.cloudflarestorage.com`;
    const url = `https://${host}/${BUCKET_NAME}/${fileName}`;

    return NextResponse.json({
      uploadUrl: url,
      fileKey: fileName,
    });
  } catch (err) {
    console.error("UPLOAD URL ERROR:", err);
    return NextResponse.json({ error: "Upload URL oluşturulamadı" }, { status: 500 });
  }
}
