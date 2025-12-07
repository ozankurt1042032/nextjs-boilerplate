import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Takipçi Analizi",
  description: "Instagram takipçi analiz sistemi"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
