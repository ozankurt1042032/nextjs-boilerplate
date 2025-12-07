import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Dosya bulunamadı" },
        { status: 400 }
      );
    }

    // Dosyanın geldiğini test etmek için
    console.log(
      "UPLOAD API HATASI TEST LOGU:",
      file.name,
      file.type,
      file.size
    );

    // Şimdilik sadece "başarılı" dönüyoruz, disk veya klasör KULLANMIYORUZ.
    // Daha sonra burayı Cloudflare R2 upload ile dolduracağız.
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("UPLOAD API HATASI:", error);
    return NextResponse.json(
      { error: "Yükleme sırasında sunucu hatası oluştu" },
      { status: 500 }
    );
  }
}
