import { Input } from "@/components/ui/input";
import { ImageIcon, X } from "lucide-react";

type ImagePropsType = {
  image: string;
  newImg: File | undefined;
  setNewImg: (value: File | undefined) => void;
};
export const FoodImage = ({ image, newImg, setNewImg }: ImagePropsType) => {
  return (
    <div className="w-full flex flex-row justify-between items-center">
      <p>Image</p>

      <div className="flex  flex-col relative w-[288px] h-[90px] p-3 bg-[#ecedf1] justify-center items-center rounded-sm">
        <img
          className={` w-[100%] h-[100%] ${newImg ? "z-10 " : "z-0"} `}
          src={newImg ? URL.createObjectURL(newImg) : image}
        />
        {newImg && (
          <button
            onClick={() => setNewImg(undefined)}
            className="text-black absolute w-4 h-4 flex justify-center items-center bg-white rounded-full z-10 left-[90%] bottom-[65%]"
          >
            <X size={18} />
          </button>
        )}
        <div className="flex flex-col absolute items-center justify-center">
          <div className="p-2 bg-white rounded-full">
            <ImageIcon size={18} />
          </div>
          <label htmlFor="insert-img"></label>
        </div>

        <Input
          onChange={(e) => {
            const newImg = e.target.files?.[0];
            if (newImg) {
              setNewImg(newImg);
            }
          }}
          type="file"
          id="insert-img"
          className="w-[288px] h-[90px] p-3 bg-[#f1f2f6] border-0 opacity-0 absolute"
        />
      </div>
    </div>
  );
};
