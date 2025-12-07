"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type AnalysisResult = {
  username: string;
  totalFollowers: number;
  newFollowers: string[];
  lostFollowers: string[];
  notFollowingBack: string[];
  youDontFollowBack: string[];
  suspectedBots: string[];
};

export default function ResultView() {
  const params = useSearchParams();
  const user = params.get("user");

  const [data, setData] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setError("Kullanıcı adı bulunamadı.");
      setLoading(false);
      return;
    }

    const run = async () => {
      try {
        const res = await fetch(`/api/analyse?user=${encodeURIComponent(user)}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("API hatası");
        }

        const json = (await res.json()) as AnalysisResult;
        setData(json);
      } catch (e) {
        console.error(e);
        setError("Analiz sırasında bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [user]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <h2>Analiz yapılıyor...</h2>
        <p>Lütfen birkaç saniye bekleyin.</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ textAlign: "center", marginTop: 60 }}>
        <h2>Bir şeyler ters gitti</h2>
        <p>{error ?? "Bilinmeyen hata"}</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>
        Takipçi Analizi Raporu
      </h1>
      <p style={{ marginTop: 8, opacity: 0.7 }}>
        Analiz edilen hesap: <strong>@{data.username}</strong>
      </p>

      {/* Özet Kartı */}
      <div
        style={{
          marginTop: 20,
          padding: 20,
          borderRadius: 12,
          border: "1px solid #eee",
          background: "#fafafa",
        }}
      >
        <h2 style={{ marginBottom: 10 }}>Özet</h2>
        <p>Toplam Takipçi: <strong>{data.totalFollowers}</strong></p>
        <p>Yeni Takipçiler: <strong>{data.newFollowers.length}</strong></p>
        <p>Takipten Çıkanlar: <strong>{data.lostFollowers.length}</strong></p>
        <p>Seni Takip Etmeyenler: <strong>{data.notFollowingBack.length}</strong></p>
        <p>Senin Takip Etmediğinler: <strong>{data.youDontFollowBack.length}</strong></p>
        <p>Bot Şüphesi: <strong>{data.suspectedBots.length}</strong></p>
      </div>

      {/* Liste Kartları */}
      <div style={{ marginTop: 30, display: "grid", gap: 20 }}>
        <ListCard title="Yeni Takipçiler" items={data.newFollowers} emptyText="Son dönemde yeni takipçi yok." />
        <ListCard title="Takipten Çıkanlar" items={data.lostFollowers} emptyText="Kimse takipten çıkmamış gibi görünüyor." />
        <ListCard title="Seni Takip Etmeyenler" items={data.notFollowingBack} emptyText="Şu an seni takip etmeyen kimse yok." />
        <ListCard title="Senin Takip Etmediklerin" items={data.youDontFollowBack} emptyText="Senin geri takip etmediğin hesap yok." />
        <ListCard title="Bot Şüphesi Taşıyan Hesaplar" items={data.suspectedBots} emptyText="Şüpheli bot hesabı tespit edilmedi." />
      </div>
    </div>
  );
}

function ListCard(props: { title: string; items: string[]; emptyText: string }) {
  const { title, items, emptyText } = props;

  return (
    <div
      style={{
        padding: 20,
        borderRadius: 12,
        border: "1px solid #eee",
        background: "#fff",
      }}
    >
      <h3 style={{ marginBottom: 10 }}>{title}</h3>
      {items.length === 0 ? (
        <p style={{ opacity: 0.6 }}>{emptyText}</p>
      ) : (
        <ul style={{ paddingLeft: 18 }}>
          {items.map((u) => (
            <li key={u}>@{u}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
