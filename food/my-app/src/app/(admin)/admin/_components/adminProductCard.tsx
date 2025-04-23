import { CategoryType } from "@/app/(user)/page";

type FoodsPropsType = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: CategoryType;
  setFoodId: (value: number) => void;
  indx: number;
};
export const AdminFoodCard = ({
  foodName,
  price,
  image,
  ingredients,
  category,
  setFoodId,
  indx,
}: FoodsPropsType) => {
  return (
    <div
      onClick={() => {
        setFoodId(indx);
      }}
      className="flex h-[360px] flex-col bg-white rounded-2xl gap-5 p-4"
    >
      <img className="rounded-xl" src={image}></img>
      <div className="flex flex-row  justify-between">
        <p className="font-bold text-red-300 ">{foodName}</p>
        <p>{price}</p>
      </div>
      <p className="text-sm">{ingredients}</p>
    </div>
  );
};
