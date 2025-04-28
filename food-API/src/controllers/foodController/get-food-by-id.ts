  import { foodModel } from "../../models/food.model";

  export const getFoodController = async (req, res) => {
    const { _id } = req.params;
    const foods = (await foodModel.findById(_id)).populate("category");
    return res.status(200).json({ foods });
  };
