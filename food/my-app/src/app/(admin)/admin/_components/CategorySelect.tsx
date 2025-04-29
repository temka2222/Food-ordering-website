import { CategoryType } from "@/app/(user)/page";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CategorySelectType = {
  categoryName: string;
  setSelectedCategoryId: (value: string) => void;
};
export const CategorySelect = ({
  setSelectedCategoryId,
  categoryName,
}: CategorySelectType) => {
  const [allCategory, setAllCategory] = useState<CategoryType[]>([]);
  const getCategory = async () => {
    const response = await axios.get("http://localhost:3001/category");
    setAllCategory(response.data.categories);
  };
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="flex-1 flex flex-row gap-6 text-nowrap justify-between items-center  ">
      Dish category
      <Select onValueChange={(value) => setSelectedCategoryId(value)}>
        <SelectTrigger className="w-[288px] pr-3 pl-3 pt-2 pb-2 border-solid border rounded-sm">
          <SelectValue placeholder={categoryName} />
        </SelectTrigger>
        <SelectContent>
          {allCategory.map((item, index) => (
            <SelectItem key={index} value={item._id}>
              {item.categoryName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
{
}
