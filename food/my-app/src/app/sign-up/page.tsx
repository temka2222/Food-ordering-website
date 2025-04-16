"use client";
import { ArrowLeft, ArrowLeftIcon } from "lucide-react";
import { use, useState } from "react";
import { InputEmail } from "./_components/inputEmail";

export default function Home() {
  const [step, setStep] = useState<number>(1);
  return step == 1 && <InputEmail />;
}
