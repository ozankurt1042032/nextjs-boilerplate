"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResultsPage() {
  const params = useSearchParams();
  const username = params.get("u");

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (username)
      fetch(`/api/analyse?u=${username}`)
        .then(res => res.json())
        .then(data => setData(data));
  }, [username]);

  if (!data) return <p className="text-center mt-20">Analiz yapılıyor...</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Analiz Sonuçları</h1>
      <p className="mt-2 text-gray-600">@{username}</p>

      <div className="mt-6 bg-white shadow p-6 rounded">
        <p>Toplam Takipçi: {data.totalFollowers}</p>
        <p>Takip Etmeyenler: {data.notFollowingBack.length}</p>
        <p>Bot Şüphesi: {data.suspectedBots.length}</p>
      </div>
    </div>
  );
}
