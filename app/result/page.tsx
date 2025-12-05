"use client";
import { useEffect, useState } from "react";

export default function ResultPage() {
  const [followers, setFollowers] = useState<string[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("followers");
    if (data) {
      setFollowers(JSON.parse(data));
    }
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 700 }}>Takipçi Listesi 📊</h1>
      <p style={{ opacity: 0.7, marginBottom: "20px" }}>
        Videodan okunan kullanıcılar:
      </p>

      <ul style={{ lineHeight: "2" }}>
        {followers.map((f, i) => (
          <li key={i} style={{ fontSize: "1.2rem" }}>
            @{f}
          </li>
        ))}
      </ul>
    </div>
  );
}
