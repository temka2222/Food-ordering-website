import { CategoryType } from "@/app/(user)/page";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/app/axios";

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
    const response = await api.get("/category");
    setAllCategory(response.data.categories);
  };
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="flex justify-between items-center">
      <label className="text-sm font-medium text-gray-700">Dish Category</label>
      <Select onValueChange={(value) => setSelectedCategoryId(value)}>
        <SelectTrigger className="w-[300px] px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none">
          <SelectValue placeholder={categoryName} />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-200 rounded-md shadow-md">
          {allCategory.map((item, index) => (
            <SelectItem
              key={index}
              value={item._id}
              className="cursor-pointer hover:bg-gray-100"
            >
              {item.categoryName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
