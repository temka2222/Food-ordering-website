"use client";
import { ArrowLeft, ArrowLeftIcon } from "lucide-react";
import { PropsWithChildren, use, useState } from "react";
import { InputEmail } from "./_components/inputEmail";
type UserValueType = {
  email: string | "";
  password: string | "";
  phoneNumber: string | "";
  address: string | "";
};
export type UserType = {
  userValues: UserValueType;
  setUserValues: (value: UserValueType) => void;
} & PropsWithChildren;
export default function Home() {
  const [step, setStep] = useState<number>(1);
  const [userValues, setUserValues] = useState<UserValueType>({
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  return (
    <StepProvider>
      step == 1 && <InputEmail />;
    </StepProvider>
  );
}
