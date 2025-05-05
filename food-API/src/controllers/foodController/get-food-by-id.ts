import { foodModel } from "../../models/food.model";

export const getFoodController = async (req, res) => {
  const { id } = req.params;

  try {
    const food = await foodModel.findById(id).populate("category");

    if (!food) {
      return res.status(404).json({ message: "Хоол олдсонгүй" });
    }

    return res.status(200).json({ food }); 
  } catch (error) {
    return res.status(500).json({ message: "Алдаа гарлаа", error });
  }
};
