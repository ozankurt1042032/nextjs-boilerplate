export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST() {
  console.log("API PROCESS ÇALIŞTI ✔");

  await new Promise((res) => setTimeout(res, 2000));

  return NextResponse.json({
    redirect: "/rapor-hazirlaniyor",
    status: "ok"
  });
}
