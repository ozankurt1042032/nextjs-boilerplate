// app/api/process/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  console.log("API /api/process ÇALIŞTI ✔");

  // Gerçek işlem yerine DEMO: 2 sn bekletiyoruz
  await new Promise((res) => setTimeout(res, 2000));

  // Sonuçta rapor sayfasına yönlendireceğiz
  return NextResponse.json({
    redirect: "/rapor-hazirlaniyor",
    status: "ok",
  });
}
