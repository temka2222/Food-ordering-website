import { CategoryType } from "@/app/(user)/page";
import { useNewFood } from "@/app/_components/foodsProvider";
import axios from "axios";
import { ImageIcon, TrashIcon, X } from "lucide-react";
import { useState } from "react";

export const FoodInputFields = () => {
  const { newFood, setNewFood } = useNewFood();
  const [selectedCatName, setselectedCatName] = useState<string>("");
  const [allCategory, setAllCategory] = useState<CategoryType[]>([]);
  const getCategory = async () => {
    const response = await axios.get("http://localhost:3001/category");
    setAllCategory(response.data.categories);
  };
  const updateFood = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/food/${newFood.foodId}`,
        {
          foodName: newFood.foodName,
          price: newFood.price,
          image: newFood.image,
          ingredients: newFood.ingredients,
          categoryId: newFood.category,
        }
      );
      await getFoods();
    } catch (error) {
      console.error("amjiltgui", error);
    }
  };

  const deleteFood = async () => {
    try {
      const response = await axios.delete("http://localhost:3001/food", {
        data: { _id: newFood.foodId },
      });

      await getFoods();
    } catch (error) {
      console.error("amjiltgui", error);
    }
  };
  return (
    <div className="flex flex-col w-[462px] h-[272px]  gap-10 justify-center pt-40">
      <div className="flex flex-col gap-6 ">
        <div className="flex-1 flex flex-row gap-6 text-nowrap justify-between items-center rounded-xl">
          Dish name
          <input
            value={newFood.foodName}
            onChange={(e) => {
              const newvalue = { ...newFood };
              newvalue.foodName = e.target.value;
              setNewFood(newvalue);
            }}
            placeholder="Type food name"
            className=" w-[288px] pr-3 pl-3 pt-2 pb-2 border-solid border rounded-sm"
          ></input>
        </div>
        <div className="flex-1 flex flex-row gap-6 text-nowrap justify-between items-center  ">
          Dish category
          <select
            onChange={(e) => {
              setselectedCatName(e.target.value);
              const newvalue = { ...newFood };
              newvalue.category = allCategory.filter((item) => {
                return item.categoryName == e.target.value;
              })?.[0]._id;

              setNewFood(newvalue);
            }}
            value={selectedCatName !== "" ? selectedCatName : categoryName}
            className=" w-[288px] pr-3 pl-3 pt-2 pb-2 border-solid border rounded-sm"
          >
            {allCategory.map((item, index) => {
              return <option key={index}>{item.categoryName}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="w-full flex flex-row justify-between">
        <p>Ingredients</p>
        <input
          onChange={(e) => {
            const newvalue = { ...newFood };
            newvalue.ingredients = e.target.value;
            setNewFood(newvalue);
          }}
          value={newFood.ingredients}
          placeholder="List ingredients..."
          className="w-[288px] min-h-[90px] border-solid border p-1 rounded-sm"
        ></input>
      </div>
      <div className="flex-1 flex flex-row gap-6 text-nowrap justify-between items-center rounded-xl">
        <p>Price</p>
        <input
          onChange={(e) => {
            const newvalue = { ...newFood };
            newvalue.price = parseInt(e.target.value);
            setNewFood(newvalue);
          }}
          value={newFood.price ? newFood.price : 0}
          placeholder="Enter price"
          className=" w-[288px] pr-3 pl-3 pt-2 pb-2 border-solid border rounded-sm"
        ></input>
      </div>
      <div className="w-full flex flex-row justify-between items-center">
        <p>Image</p>

        <div className="flex  flex-col relative w-[288px] h-[90px] p-3 bg-[#ecedf1] justify-center items-center rounded-sm">
          <img
            className={` w-[100%] h-[100%] ${newFood.image ? "z-10 " : "z-0"} `}
            src={newFood.image}
          />
          {newFood.image && (
            <button
              onClick={() => {
                const newvalue = { ...newFood };
                newvalue.image = "";
                setNewFood(newvalue);
              }}
              className="text-black absolute w-4 h-4 flex justify-center items-center bg-white rounded-full z-10 left-[90%] bottom-[65%]"
            >
              <X />
            </button>
          )}
          <div className="flex flex-col absolute items-center justify-center">
            <div className="p-2 bg-white rounded-full">
              <ImageIcon size={18} />
            </div>
            <label htmlFor="insert-img"></label>
          </div>

          <input
            onChange={(e) => {
              const newvalue = { ...newFood };
              const newImage = e.target.files?.[0];
              if (newImage) {
                newvalue.image = URL.createObjectURL(newImage);
              }
              setNewFood(newvalue);
            }}
            type="file"
            id="insert-img"
            className="w-[288px] h-[90px] p-3 bg-[#f1f2f6] border-0 opacity-0 absolute"
          />
        </div>
      </div>

      <div className="w-full flex flex-row justify-between">
        <TrashIcon
          onClick={() => {
            deleteFood();
          }}
          className="text-red-500"
        />
        <button
          onClick={() => {
            updateFood();
            console.log(newFood);
          }}
          className="flex w-[126px] h-10 justify-center items-center bg-black text-white rounded-xl"
        >
          Save changes
        </button>
      </div>
    </div>
  );
};
