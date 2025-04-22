import { foodModel } from "../../models/food.model";

export const getFoodsBycategory = async (req, res) => {
  const { categoryId } = req.query;
  try {
    const foods = await foodModel
      .find(categoryId ? { category: categoryId } : {})
      .populate("category");
    return res.status(200).json({ foods });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};
