"use client";
import { useState } from "react";
import { InsertEmail } from "./_components/insertEmail";
import { ResetPassword } from "./_components/reset-pass";

export default function Home() {
  const [step, setStep] = useState<number>(1);

  return (
    <div>
      {step == 1 && <InsertEmail step={step} setStep={setStep} />}
      {step == 2 && <ResetPassword step={step} setStep={setStep} />}
    </div>
  );
}
