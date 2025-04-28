import { foodModel } from "../../models/food.model";

export const deleteteFoodController = async (req, res) => {
  const { _id } = req.body;
  await foodModel.findByIdAndDelete(_id);

  return res.status(201).json({ message: "amjilttai" });
};
