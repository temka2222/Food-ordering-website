import { categoryModel } from "../../models/foodCategory.model";

export const getCategoryController = async (req, res) => {
  const categories = await categoryModel.find({});
  return res.status(200).json({ categories });
};
