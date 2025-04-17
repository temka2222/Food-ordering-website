import { foodModel } from "../../models/food.model";

export const getFoodsBycategory = async (req, res) => {
  try {
    const foods = await foodModel.find({}).populate("category");
    return res.status(200).json({ foods });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};
