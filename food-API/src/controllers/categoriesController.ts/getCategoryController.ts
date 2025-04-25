import { categoryModel } from "../../models/foodCategory.model";

export const getCategoryController = async (req, res) => {
  const { categoryId } = req.query;
  try {
    const categories = await categoryModel.find(
      categoryId ? { _id: categoryId } : {}
    );
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};
