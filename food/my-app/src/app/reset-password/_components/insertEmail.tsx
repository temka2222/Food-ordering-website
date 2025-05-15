import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
type StepPropsType = {
  step: number;
  setStep: (value: number) => void;
};
export const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Insert email" })
    .email({ message: "Please provide a valid email address." }),
});
export const InsertEmail = ({ step, setStep }: StepPropsType) => {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
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
            <p className="font-bold text-2xl">Reset your password </p>
            <p className="text-[#71717A] ">
              Enter your email to receive a password reset link.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(() => {
              setStep(step + 1);
            })}
            className="  flex flex-col gap-8  "
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
            <button
              type="submit"
              className="w-[70%] flex justify-center items-center text-white border-solid border bg-black pr-8 pl-8 rounded-sm p-2 "
            >
              Send link
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
              Log in{" "}
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
