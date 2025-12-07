"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AnalysisPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleStart = async () => {
    if (!username) return alert("Kullanıcı adı giriniz");

    router.push(`/analysis/results?u=${username}`);
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-20">
      <h1 className="text-2xl font-bold">Instagram Kullanıcı Adı</h1>
      <input
        className="border p-2 rounded w-72"
        placeholder="ornek: ozankurt"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        onClick={handleStart}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Analizi Başlat
      </button>
    </div>
  );
}
