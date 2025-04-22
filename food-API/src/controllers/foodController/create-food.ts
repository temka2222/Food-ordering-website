import { foodModel } from "../../models/food.model";

export const createFoodController = async (req, res) => {
  const { foodName, price, image, category,ingredients } = req.body;
  await foodModel.create({
    foodName,
    price,
    category,
    image,
    ingredients,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return res.status(201).json({ message: "amjilttai" });
};
