import { Logo } from "@/app/_components/assets/Logo";
type OrderCartMessageType = {
  title: string;
  description: string;
};
export const OrderCartMessage = ({
  title,
  description,
}: OrderCartMessageType) => {
  return (
    <div className="w-full flex flex-col px-4 pt-4 pb-32 ">
      <div className="bg-[#c8c5c3b8] py-12 px-8 flex flex-col justify-center items-center gap rounded-xl ">
        <Logo />
        <p className="font-medium">{title}</p>
        <p className="text-[#71717A]">{description}</p>
      </div>
    </div>
  );
};
