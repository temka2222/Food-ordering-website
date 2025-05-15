"use client";

import { useState } from "react";
import { InputEmail } from "./_components/inputEmail";
import { CreatePassword } from "./_components/createPassword";
import { useUser } from "./_components/userValueProvider";
export type NewUserType = {
  email: string;
  password: string;
  confirmPass: string;
  phoneNumber: string;
  address: string;
};
export default function Home() {
  const { step, setStep } = useUser();
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
