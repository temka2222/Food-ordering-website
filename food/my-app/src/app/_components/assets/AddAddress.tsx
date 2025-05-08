import { useUser } from "@/app/(auth)/sign-up/_components/userValueProvider";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import axios from "axios";
import { useState } from "react";

export const AddAddress = () => {
  const [selectButton, setSelectButton] = useState("Deliver Here");
  const [address, setAddress] = useState("");
  const { UpdateUserAddress } = useUser();

  return (
    <DialogContent className=" gap-6 rounded-xl">
      <DialogTitle>Delivery address</DialogTitle>
      <input
        onChange={(event) => {
          setAddress(event.target.value);
        }}
        className=" w-full h-[100px] border border-solid rounded-sm"
      ></input>
      <div className="w-full flex flex-row gap-6 justify-end">
        <Button className="px-4 py-2 rounded-xl flex justify-center items-center bg-white text-black border border-solid hover:text-white">
          cancel
        </Button>
        <Button
          onClick={() => {
            UpdateUserAddress(address);
          }}
          className="px-4 py-2 rounded-xl flex justify-center items-center"
        >
          Deliver Here
        </Button>
      </div>
    </DialogContent>
  );
};
