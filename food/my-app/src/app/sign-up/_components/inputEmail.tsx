import { ArrowLeft } from "lucide-react";

export const InputEmail = () => {
  return (
    <div className="flex  flex-row w-full gap-10 p-4 justify-center items-center pl-6  text-xl">
      <div className="flex-1 ">
        <div className="flex flex-col gap-6">
          <button className="p-2 border-solid border w-fit">
            <ArrowLeft />
          </button>
          <div>
            <p className="font-bold text-xl">Create your account</p>
            <p className="text-[#71717A]">
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
            <p className="text-[#71717A] ">Already have an account?</p>
            <button className="text-[#2563EB]">Log in </button>
          </div>
        </div>
      </div>
      <div className="flex-[1.5] border-solid border aspect-[1/1]">
        <img src="/Frame 1321316047.png"></img>
      </div>
    </div>
  );
};
