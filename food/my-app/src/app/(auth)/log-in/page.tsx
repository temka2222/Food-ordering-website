"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUser } from "../sign-up/_components/userValueProvider";
import { loginSchema } from "./_components/schema";

export default function Home() {
  const router = useRouter();
  const { signIn } = useUser();
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });
  return (
    <div className="flex  flex-row w-full gap-10 p-4 justify-center items-center pl-6  text-[16px]">
      <div className="flex-1 ">
        <div className="flex flex-col gap-8">
          <button
            onClick={() => {
              router.push("/");
            }}
            className="p-2 border-solid border w-fit"
          >
            <ArrowLeft />
          </button>
          <div>
            <p className="font-bold text-2xl">Log in </p>
            <p className="text-[#71717A] ">
              Log in to enjoy your favorite dishes.
            </p>
          </div>
          <form
            onSubmit={handleSubmit((data) => {
              signIn(data.email, data.password);
            })}
            className="  flex flex-col gap-8 items-start  "
          >
            <input
              {...register("email")}
              className="w-[70%] border-solid border rounded-sm p-2"
              placeholder="Enter your email address"
            ></input>
            {formState.errors.email && (
              <div className="text-red-400">
                {formState.errors.email.message}
              </div>
            )}
            <input
              {...register("password")}
              className="w-[70%] border-solid border rounded-sm p-2"
              placeholder="Password"
            ></input>
            {formState.errors.password && (
              <div className="text-red-400">
                {formState.errors.password.message}
              </div>
            )}

            <button
              onClick={() => {
                router.push("./reset-password");
              }}
              className="underline"
            >
              Forgot password ?
            </button>

            <button
              type="submit"
              disabled={formState.isSubmitting || !formState.isValid}
              className={`w-[70%] flex justify-center items-center text-white border-solid border pr-8 pl-8 rounded-sm p-2 
    ${
      formState.isSubmitting || !formState.isValid ? "bg-[#cccbcc]" : "bg-black"
    } 
  `}
            >
              Let&apos;s Go
            </button>
          </form>
          <div className="flex flex-row gap-3">
            <p className="text-[#71717A]  ">Don&apos;t have an account?</p>
            <button
              onClick={() => router.push("./sign-up")}
              className="text-[#2563EB]"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>

      <div className="flex-[1.5] border-solid border aspect-[1/1]">
        <img src="/Frame 1321316047.png"></img>
      </div>
    </div>
  );
}
