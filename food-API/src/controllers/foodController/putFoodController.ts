import { foodModel } from "../../models/food.model";

export const updateFoodController = async (req, res) => {
  const { foodName, price, image, id } = req.body;
  await foodModel.findByIdAndUpdate(id, {
    foodName,
    price,
    image,
  });

  return res.status(201).json({ message: "amjilttai" });
};
