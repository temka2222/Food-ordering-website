"use client";
import { FbLogo } from "./assets/FacebookLogo";
import { InstLogo } from "./assets/InstagramIcon";
import { Logo } from "./assets/Logo";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <div className=" flex flex-col relative w-full h-160 overflow-hidden pr-22 pl-22 pt-10 pb-20 bg-black gap-20">
      <div className="flex w-[1440px] flex-row  absolute  bg-red-500 text-white gap-9 font-bold text-xl whitespace-nowrap  right-[-0.5px]  p-25 pt-7 pb-7">
        <motion.div
          animate={{ x: ["0%", "-9%", "-20%", "-30%", "-40%"] }}
          transition={{
            duration: 10,
            ease: "linear",
            repeat: Infinity,
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
          className="flex flex-row"
        >
          <div className="px-6">Fresh fast delivered</div>
          <div className="px-6">Fresh fast delivered</div>
          <div className="px-6">Fresh fast delivered</div>
          <div className="px-6">Fresh fast delivered</div>
          <div className="px-6">Fresh fast delivered</div>
          <div className="px-6">Fresh fast delivered</div>
          <div className="px-6">Fresh fast delivered</div>
          <div className="px-6">Fresh fast delivered</div>
          <div className="px-6">Fresh fast delivered</div>
          <div className="px-6">Fresh fast delivered</div>
        </motion.div>
      </div>
      <div className="flex flex-row gap-55 pt-50">
        <div className=" flex flex-col gap-3">
          <Logo />
          <div>
            <p className="font-bold text-xl text-white">
              Nom<span className="text-red-500">Nom</span>
            </p>
            <p className="text-xs text-white">Swift delivery</p>
          </div>
        </div>
        <div className="flex flex-row gap-28 text-base text-white h-fit">
          <div className="flex flex-col gap-4 items-center">
            <p className="text-[#71717A]">MENU </p>
            <p>Home</p>
            <p>Contact us</p>
            <p>Delivery zone</p>
          </div>
          <div className="flex flex-col gap-4 ">
            <p className="text-[#71717A]">NOMNOM </p>
            <p>Appetizers</p>
            <p>Salads</p>
            <p>Pizzas</p>
            <p>Main dishes</p>
            <p>Desserts</p>
          </div>
          <div className="flex flex-col gap-4 justify-end ">
            <p>Side dish </p>
            <p>Brunch</p>
            <p>Desserts</p>
            <p>Beverages</p>
            <p>Fish & Sea foods</p>
          </div>
          <div className="flex flex-col gap-4 ">
            <p className="text-[#71717A]">FOLLOW US </p>
            <div className="flex flex-row gap-4">
              <FbLogo />
              <InstLogo />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-row gap-12 pt-8 pb-8 text-[#71717A] text-sm border-t-solid border-t border-t-[#71717A] items-center ">
        <p>Copy right 2024 © Nomnom LLC</p>
        <p>Privacy policy </p>
        <p>Terms and conditoin</p>
        <p>Cookie policy</p>
      </div>
    </div>
  );
};
