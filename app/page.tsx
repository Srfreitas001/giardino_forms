'use client'

import { Suspense } from "react";
import { OnbordingForm } from "./onbording-form";

export default function Home() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <OnbordingForm />
    </Suspense>
  );
}