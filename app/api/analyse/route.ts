import { NextResponse } from "next/server";

type AnalysisResult = {
  username: string;
  totalFollowers: number;
  newFollowers: string[];
  lostFollowers: string[];
  notFollowingBack: string[];
  youDontFollowBack: string[];
  suspectedBots: string[];
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("user") || "bilinmiyor";

  // 🔹 Burada normalde Instagram'dan veri çekilecek.
  // Şimdilik DEMO verisi üretiyoruz ki uygulama çalışsın.
  const fake: AnalysisResult = {
    username,
    totalFollowers: 1287,
    newFollowers: ["ahmet_1907", "eliffoto", "design.by.ayse"],
    lostFollowers: ["eski_takipci1", "deneme_hesap"],
    notFollowingBack: ["fenomen_x", "magaza_tr", "spor_sayfasi"],
    youDontFollowBack: ["kardesin", "iş_arkadasi"],
    suspectedBots: ["xx_auto_follow", "free_coins_999", "insta_fast_follow"]
  };

  return NextResponse.json(fake);
}
