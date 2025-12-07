import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("u");

  // Burada gerçek IG API/ scraping olacak (bir sonraki aşamada)
  const fakeData = {
    totalFollowers: 1250,
    notFollowingBack: ["user1", "user2", "user3"],
    suspectedBots: ["bot123", "fake_999"],
  };

  return NextResponse.json(fakeData);
}
