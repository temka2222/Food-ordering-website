"use client";
import { ArrowLeft, ArrowLeftIcon } from "lucide-react";
import { PropsWithChildren, use, useState } from "react";
import { InputEmail } from "./_components/inputEmail";
import { UserProvider } from "./_components/userValueProvider";
import { CreatePassword } from "./_components/createPassword";

export default function Home() {
  const [step, setStep] = useState<number>(1);

  return (
    <div>
      {step == 1 && <InputEmail step={step} setStep={setStep} />}
      {step == 2 && <CreatePassword step={step} setStep={setStep} />}
    </div>
  );
}
