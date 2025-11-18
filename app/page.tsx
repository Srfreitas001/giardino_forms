'use client'

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { OnbordingForm } from "./onbording-form";

export default function Home() {
  return (
    <Suspense fallback={<div></div>}>
      <OnbordingForm />
    </Suspense>
  );
}