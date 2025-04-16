import { foodModel } from "../../models/food.model";

export const deleteteFoodController = async (req, res) => {
  const { id } = req.body;
  await foodModel.findByIdAndDelete(id);

  return res.status(201).json({ message: "amjilttai" });
};
