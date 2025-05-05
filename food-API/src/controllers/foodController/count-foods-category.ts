import { foodModel } from "../../models/food.model";

export const getCountFoodsBycategory = async (req, res) => {
  const { categoryId } = req.query;
  try {
    const totalFood = await foodModel
      .find(categoryId ? { category: categoryId } : {})
      .countDocuments();
    return res.status(200).json({ totalFood });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};