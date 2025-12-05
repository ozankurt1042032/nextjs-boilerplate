"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Process() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      console.log("process tetiklendi");

      const res = await fetch("/api/process", {
        method: "POST",
        cache: "no-store",
      }).catch((e) => console.log("fetch error", e));

      console.log("process yanıt:", res);

      if (!res) {
        alert("API tetiklenmedi!");
        return;
      }

      const data = await res.json().catch((e) => console.log("json error", e));

      console.log("data:", data);

      if (data?.redirect) {
        router.push(data.redirect);
      } else {
        alert("Redirect gelmedi, API dönmüyor!");
      }
    };

    run();
  }, []);

  return (
    <main style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh"
    }}>
      <h1>İşlem Başlatılıyor...</h1>
      <p>Lütfen bekleyin</p>
    </main>
  );
}
