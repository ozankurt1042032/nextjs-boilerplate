"use client";

import { useRouter } from "next/navigation";

export default function ConnectPage() {
  const router = useRouter();

  const go = (path: string) => {
    router.push(path);
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: 10 }}>
        Verini nasıl bağlamak istersin?
      </h1>
      <p style={{ opacity: 0.7, marginBottom: 20 }}>
        Instagram şifreni asla sormuyoruz. Aşağıdaki yöntemlerden birini seçerek analiz için verini getirebilirsin.
      </p>

      <div style={{ display: "grid", gap: 16 }}>
        <OptionCard
          title="Meta Business / Creator ile bağlan"
          desc="Resmi Meta API ile istatistiksel raporlar, içerik performansı ve takipçi analizi."
          onClick={() => go("/connect/meta")}
        />
        <OptionCard
          title="Ekran görüntüsü / ekran kaydı yükle"
          desc="Takipçi listesinin ekran görüntüsünü veya videonu yükle, biz kullanıcı adlarını çıkaralım."
          onClick={() => go("/upload")}
        />
        <OptionCard
          title="Instagram veri arşivini yükle"
          desc="Instagram'dan indirdiğin JSON/ZIP arşivini yükle, biz detaylı analiz yapalım."
          onClick={() => go("/upload-archive")}
        />
        <OptionCard
          title="Kendi verimi JSON formatında yükle (ileri seviye)"
          desc="Kendi cihazında çalışan bir toplayıcı kullanıyorsan, ürettiği JSON dosyasını buradan yükleyebilirsin."
          onClick={() => go("/upload-json")}
        />
      </div>
    </div>
  );
}

function OptionCard(props: { title: string; desc: string; onClick: () => void }) {
  const { title, desc, onClick } = props;
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: "left",
        padding: 16,
        borderRadius: 12,
        border: "1px solid #ddd",
        background: "#fff",
        cursor: "pointer",
      }}
    >
      <h2 style={{ marginBottom: 6, fontSize: "1.1rem" }}>{title}</h2>
      <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>{desc}</p>
    </button>
  );
}
