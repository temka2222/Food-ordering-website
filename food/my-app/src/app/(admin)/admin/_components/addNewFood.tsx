import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageIcon, Loader, PlusIcon, X } from "lucide-react";
import axios from "axios";
import { CategoryType } from "@/app/(user)/page";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/app/axios";
type NewFoodPropsType = {
  categoryId: string;
  getFoods: () => Promise<void>;
};
const UPLOUD_PRESSET = "temuulen";
const CLOUD_NAME = "dpmo1etqt";

export const AddNewFood = ({ categoryId, getFoods }: NewFoodPropsType) => {
  const [newFoodName, setNewFoodName] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [newIngredients, setNewIngredients] = useState("");
  const [newImg, setNewImg] = useState<File | undefined>();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [prevImage, setPrevImage] = useState<string | null>(null);
  const [category, setCategory] = useState<CategoryType[]>([]);
  const [imgLoading, setImgLoading] = useState(false);
  const uploadImage = async (file: File | undefined) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOUD_PRESSET);
    try {
      setImgLoading(true);
      const responseImg = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/formData",
          },
        }
      );
      return responseImg.data.url;
    } catch (error) {
      console.log(error);
    }
  };

  const getCategory = async () => {
    const response = await api.get(`/category?categoryId=${categoryId}`);

    setCategory(response.data.categories);
  };

  useEffect(() => {
    getCategory();
  }, []);

  const addNewFood = async (url: string) => {
    try {
      setLoading(true);
      await api.post("/food", {
        foodName: newFoodName,
        price: newPrice,
        image: url,
        ingredients: newIngredients,
        category: categoryId,
      });
      await getFoods();
      toast.success("New dish is being added to the menu");
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create new food");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[340px] flex-col bg-white rounded-2xl gap-5 p-4 border-dashed border-red-500 border-3 justify-center items-center">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="text-white w-9 h-9 flex justify-center items-center bg-red-500 rounded-full ml-4 ">
          <PlusIcon size={18} />
        </DialogTrigger>

        <DialogContent className="w-full h-[600px] ">
          <DialogHeader>
            <DialogTitle className="pb-10">
              Add new Dish to {category[0]?.categoryName}
            </DialogTitle>
            <DialogDescription>
              <div className="flex flex-col w-[462px] h-[272px]  gap-10 justify-center pt-40">
                <div className="flex flex-row gap-6 ">
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="text-black">Food name</div>
                    <input
                      onChange={(e) => {
                        setNewFoodName(e.target.value);
                      }}
                      placeholder="Type food name"
                      className=" w-full pr-3 pl-3 pt-2 pb-2 border-solid border rounded-sm"
                    ></input>
                  </div>
                  <div className="flex-1 flex flex-col gap-2 text-black">
                    Food price
                    <input
                      onChange={(e) => {
                        setNewPrice(Number(e.target.value));
                      }}
                      placeholder="Enter price..."
                      className=" w-full pr-3 pl-3 pt-2 pb-2 border-solid border rounded-sm"
                    ></input>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <p className="text-black">Ingredients</p>
                  <input
                    onChange={(e) => {
                      setNewIngredients(e.target.value);
                    }}
                    placeholder="List ingredients..."
                    className="w-full min-h-[90px] border-solid border p-1 rounded-sm"
                  ></input>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <p className="text-black">Image</p>
                  <div className=" flex flex-col realative w-full h-[90px] p-3 bg-[#ecedf1] justify-center items-center mr-auto rounded-sm">
                    {imgLoading == true && <Loader className="animate-spin" />}
                    {prevImage && (
                      <img className="w-[100%] h-[100%]" src={prevImage} />
                    )}
                    {newImg && (
                      <button
                        onClick={() => setPrevImage(null)}
                        className="text-black absolute w-4 h-4 flex justify-center items-center bg-white rounded-full z-10 left-[90%] bottom-[34%]"
                      >
                        <X size={15} />
                      </button>
                    )}
                    <div className="flex flex-col  absolute items-center justify-center">
                      <div
                        className={`p-2 bg-white rounded-full ${
                          prevImage || imgLoading ? "opacity-0" : ""
                        }`}
                      >
                        <ImageIcon size={18} />
                      </div>
                      <label
                        className={`${
                          prevImage || imgLoading ? "opacity-0" : ""
                        }`}
                        htmlFor="insert-img"
                      >
                        Choose a file or drag & drop it here
                      </label>
                    </div>

                    <input
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setNewImg(file);
                          setPrevImage(URL.createObjectURL(file));
                          setImgLoading(false);
                        }
                      }}
                      type="file"
                      id="insert-img"
                      className="w-full h-[90px] p-3 bg-[#f1f2f6] border-0 opacity-0 absolute"
                    ></input>
                  </div>
                </div>

                <div className="w-full flex flex-col items-end">
                  <button
                    onClick={async () => {
                      const url = await uploadImage(newImg);
                      if (url) {
                        await addNewFood(url);
                      }
                    }}
                    className="flex w-[93px] h-10 justify-center items-center bg-black text-white rounded-xl"
                  >
                    {loading ? (
                      <Loader size={18} className="animate-spin" />
                    ) : (
                      "Add dish"
                    )}
                  </button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <p className=" font-medium">Add new Dish</p>
    </div>
  );
};
