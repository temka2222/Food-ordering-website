import { foodModel } from "../../models/food.model";

export const createFoodController = async (req, res) => {
  const { foodName, price, image, category } = req.body;
  await foodModel.create({
    foodName,
    price,
    category,
    image,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return res.status(201).json({ message: "amjilttai" });
};
