"use client";
import { ArrowLeft, ArrowLeftIcon } from "lucide-react";
import { PropsWithChildren, use, useState } from "react";
import { InputEmail } from "./_components/inputEmail";
import { CreatePassword } from "./_components/createPassword";
export type NewUserType = {
  email: string;
  password: string;
  confirmPass: string;
  phoneNumber: string;
  address: string;
};
export default function Home() {
  const [step, setStep] = useState<number>(1);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    confirmPass: "",
    phoneNumber: "",
    address: "",
  });
  return (
    <div>
      {step == 1 && (
        <InputEmail
          step={step}
          setStep={setStep}
          newUser={newUser}
          setNewUser={setNewUser}
        />
      )}
      {step == 2 && (
        <CreatePassword
          step={step}
          setStep={setStep}
          newUser={newUser}
          setNewUser={setNewUser}
        />
      )}
    </div>
  );
}
