"use client";

import { Suspense } from "react";
import ResultView from "./view";

export default function ResultsPage() {
  return (
    <Suspense fallback={<p>Analiz yapılıyor...</p>}>
      <ResultView />
    </Suspense>
  );
}
