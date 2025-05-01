import { Input } from "@/components/ui/input";
import { ImageIcon, X } from "lucide-react";
import { CLOUD_NAME, UPLOAD_PRESET } from "./adminProductCard";
import axios from "axios";
import { useState } from "react";

type ImagePropsType = {
  image: string;
  newImg: File | undefined;
  setNewImg: (value: File | undefined) => void;
};
export const FoodImage = ({ image, newImg, setNewImg }: ImagePropsType) => {

     const [prevImage, setPrevImage] = useState<string|null>(image);
 return (
  <div className="w-full flex justify-between items-center">
    <label className="text-sm font-medium text-gray-700">Image</label>

    <div className="relative w-[300px] h-[90px] bg-gray-100 rounded-md overflow-hidden flex justify-center items-center">
      {prevImage && (
        <img
          src={prevImage}
          className={`absolute top-0 left-0 w-full h-full object-cover ${
            newImg ? "z-10" : "z-0"
          }`}
        />
      )}

     
     {prevImage && (
  <button
    onClick={() => {
      setNewImg(undefined);
      setPrevImage(""); // preview-г бас арилгана
    }}
    className="absolute top-2 right-2 bg-white border border-gray-300 rounded-full p-1 z-20"
  >
    <X size={14} />
  </button>
)}

    
      {!prevImage && (
  <div className="flex flex-col items-center justify-center z-10 pointer-events-none">
    <div className="p-2 bg-white rounded-full shadow">
      <ImageIcon size={18} />
    </div>
    <p className="text-xs text-gray-500 mt-1">Upload image</p>
  </div>
)}

    
      <Input
        type="file"
        id="insert-img"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setNewImg(file);
            setPrevImage(URL.createObjectURL(file));
          }
        }}
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  </div>
);

};
