import { CategoryType } from "../(user)/page";


type FoodsType = {
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: CategoryType;

};
export const FoodCard = ({
  foodName,
  price,
  image,
  ingredients,
  category,
}: FoodsType) => {
return (
  <div className="flex flex-col bg-white rounded-2xl gap-5 p-4">
    <div className="flex flex-col h-[360px]">
      <img
        className="rounded-xl w-full h-[200px] object-cover mb-4" // Зурагны өндөр
        src={image}
        alt={foodName}
      />
      <div className="flex flex-col justify-between h-full">
        <div>
        <p className="font-bold text-red-400 text-lg">{foodName}</p>
        <p className="font-bold text-lg">{price}</p>
        </div>
        <p className="text-sm text-gray-600">{ingredients}</p>
      </div>
    </div>
  </div>
);

};
