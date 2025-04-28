import { foodModel } from "../../models/food.model";

export const updateFoodController = async (req, res) => {
  const { id } = req.params
  const { foodName, price, image, ingredients, categoryId } = req.body;
  await foodModel.findByIdAndUpdate(id, {
    category: categoryId,
    foodName,
    price,
    image,
    ingredients,
  });

  return res.status(201).json({ message: "amjilttai" });
};
