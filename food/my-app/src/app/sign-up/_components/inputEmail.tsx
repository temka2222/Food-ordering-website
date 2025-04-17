import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useStep } from "./stepProvider";

export const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Insert email" })
    .email({ message: "Please provide a valid email address." }),
});
export const InputEmail = () => {
  const { step, setStep } = useStep();
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });
  return (
    <div className="flex  flex-row w-full gap-10 p-4 justify-center items-center pl-6  text-xl">
      <form
        onSubmit={handleSubmit((data) => {
          setStep((step) => step + 1);
          const newvalue = { ...values };
          newvalue.email = data.email;
          newvalue.phone = data.phone;
          newvalue.password = data.password;
          newvalue.confirmPass = data.confirmPass;

          setValues(newvalue);
        })}
        className="  flex flex-col gap-5  "
      >
        <div className="flex-1 ">
          <div className="flex flex-col gap-6">
            <button className="p-2 border-solid border w-fit">
              <ArrowLeft />
            </button>
            <div>
              <p className="font-bold text-2xl">Create your account</p>
              <p className="text-[#71717A] text-sm">
                Sign up to explore your favorite dishes.
              </p>
            </div>
            <input
              className="w-[70%] border-solid border rounded-sm p-2"
              placeholder="Enter your email address"
            ></input>
            <button className="w-[70%] flex justify-center items-center border-solid border pr-8 pl-8 rounded-sm p-2 ">
              Let's Go
            </button>
            <div className="flex flex-row gap-3">
              <p className="text-[#71717A]  ">Already have an account?</p>
              <button className="text-[#2563EB]">Log in </button>
            </div>
          </div>
        </div>
      </form>
      <div className="flex-[1.5] border-solid border aspect-[1/1]">
        <img src="/Frame 1321316047.png"></img>
      </div>
    </div>
  );
};
