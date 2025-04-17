import { foodModel } from "../../models/food.model";

export const getFoodController = async (req, res) => {
  const { id } = req.body;
  const foods = await foodModel.findById(id);
  return res.status(200).json({ foods });
};
