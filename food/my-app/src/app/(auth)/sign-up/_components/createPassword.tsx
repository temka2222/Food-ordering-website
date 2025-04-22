import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUser } from "./userValueProvider";
import { useState } from "react";
import { text } from "stream/consumers";
import { useRouter } from "next/navigation";
const num = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
type StepPropsType = {
  step: number;
  setStep: (value: number) => void;
};
export const schema = z
  .object({
    password: z
      .string()
      .min(1, { message: "Insert Password" })
      .refine(
        (value) => {
          const chars = value.split("");

          return chars.every(
            (char) => letters.includes(char) || num.includes(char)
          );
        },
        {
          message: "Password must include letters and numbers.",
        }
      ),
    confirmPass: z.string(),
  })
  .refine((data) => data.password === data.confirmPass, {
    message: "Passwords do not match. Please try again.",
    path: ["confirmPass"],
  });

export const CreatePassword = ({ step, setStep }: StepPropsType) => {
  const router = useRouter();
  const { userValues, setUserValues } = useUser();
  const [checkValue, setCheckValue] = useState(false);
  const { register, handleSubmit, formState, watch } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      confirmPass: "",
    },
  });
  //   const { password, confirmPass } = watch();

  //   console.log(password, confirmPass);

  return (
    <div className="flex  flex-row w-full gap-10 p-4 justify-center items-center pl-6  text-[16px]">
      <div className="flex-1 ">
        <div className="flex flex-col gap-8">
          <button
            onClick={() => setStep(step - 1)}
            className="p-2 border-solid border w-fit"
          >
            <ArrowLeft />
          </button>
          <div>
            <p className="font-bold text-2xl">Create a strong password</p>
            <p className="text-[#71717A] ">
              Create a strong password with letters, numbers.
            </p>
          </div>
          <form
            onSubmit={handleSubmit((data) => {
              const newvalue = { ...userValues };
              newvalue.password = data.password;
              newvalue.confirmPass = data.confirmPass;

              setUserValues(newvalue);
              setStep(step + 1);
            })}
            className="  flex  flex-col gap-8  "
          >
            <input
              type={checkValue ? "text" : "password"}
              {...register("password")}
              className="w-[70%] border-solid border rounded-sm p-2"
              placeholder="Password"
            ></input>
            {formState.errors.password && (
              <div className="text-red-400">
                {formState.errors.password.message}
              </div>
            )}
            <input
              type={checkValue ? "text" : "password"}
              {...register("confirmPass")}
              className="w-[70%] border-solid border rounded-sm p-2"
              placeholder="Confirm"
            ></input>
            {formState.errors.confirmPass && (
              <div className="text-red-400">
                {formState.errors.confirmPass.message}
              </div>
            )}
            <label className="flex items-center gap-2 text-[#71717A]">
              <input
                type="checkbox"
                onChange={(e) => setCheckValue(e.target.checked)}
              />
              Show password
            </label>
            <button
              type="submit"
              className="w-[70%] flex justify-center items-center bg-[#cccbcc] text-white border-solid border pr-8 pl-8 rounded-sm p-2 "
            >
              Let's Go
            </button>
          </form>
          <div className="flex flex-row gap-3">
            <p className="text-[#71717A]  ">Already have an account?</p>
            <button
              onClick={() => {
                router.push("./log-in");
              }}
              className="text-[#2563EB]"
            >
              Log in
            </button>
          </div>
        </div>
      </div>

      <div className="flex-[1.5] border-solid border aspect-[1/1]">
        <img src="/Frame 1321316047.png"></img>
      </div>
    </div>
  );
};
