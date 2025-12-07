"use client";

import React, { useEffect, useState } from "react";

export default function AnalysisResults() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("archive_data");
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        setData(null);
      }
    }
  }, []);

  if (!data) {
    return (
      <main style={{ padding: 40, textAlign: "center" }}>
        <h2>Analiz için veri bulunamadı</h2>
        <p>Lütfen önce Instagram ZIP arşivini yükleyin.</p>
        <a href="/upload-archive" style={{ color: "blue" }}>
          Arşiv Yükleme Sayfasına Git
        </a>
      </main>
    );
  }

  const followers = data.followers?.map((f: any) => f.string_list_data?.[0]?.value) || [];
  const following = data.following?.map((f: any) => f.string_list_data?.[0]?.value) || [];

  const notFollowBack = following.filter((acc: string) => !followers.includes(acc));
  const removedYou = followers.filter((acc: string) => !following.includes(acc));

  return (
    <main style={{ padding: 40, maxWidth: 800, margin: "0 auto" }}>
      <h1>📊 Takipçi Analiz Sonuçları</h1>

      <section style={{ marginTop: 40 }}>
        <h2>👤 Seni Takip Etmeyenler</h2>
        <p style={{ opacity: 0.7 }}>
          Sen onları takip ediyorsun ama onlar seni etmiyor
        </p>

        {notFollowBack.length === 0 ? (
          <p>Herkes seni geri takip ediyor 🎉</p>
        ) : (
          <ul>
            {notFollowBack.map((u: string, i: number) => (
              <li key={i}>{u}</li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>🚫 Seni Takipten Çıkanlar</h2>
        <p style={{ opacity: 0.7 }}>Önceden takip ediyorlardı ama artık etmiyorlar</p>

        {removedYou.length === 0 ? (
          <p>Kimse seni takipten çıkmamış 🎉</p>
        ) : (
          <ul>
            {removedYou.map((u: string, i: number) => (
              <li key={i}>{u}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
