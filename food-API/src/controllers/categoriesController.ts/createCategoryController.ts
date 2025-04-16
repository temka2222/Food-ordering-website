import { categoryModel } from "../../models/foodCategory.model";

export const createCategoryController = async (req, res) => {
  const { categoryName } = req.body;
  await categoryModel.create({
    categoryName,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return res.status(201).json({ message: "amjilttai" });
};
