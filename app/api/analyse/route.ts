import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileKey } = body;

    if (!fileKey) {
      return NextResponse.json(
        { error: "fileKey eksik" },
        { status: 400 }
      );
    }

    // ŞİMDİLİK SADECE LOG
    console.log("Analiz edilecek video:", fileKey);

    // Buraya ileride:
    // - video download
    // - frame çıkarma
    // - takipçi sayma
    // eklenecek

    return NextResponse.json({
      success: true,
      message: "Video analize alındı",
      fileKey,
    });
  } catch (err) {
    console.error("ANALYSE API ERROR:", err);
    return NextResponse.json(
      { error: "Analiz sırasında hata oluştu" },
      { status: 500 }
    );
  }
}
