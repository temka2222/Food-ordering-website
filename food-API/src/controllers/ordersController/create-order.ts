import { foodModel } from "../../models/food.model";
import { orderModel } from "../../models/orders.model";

export const createOrderController = async (req, res) => {
  try {
    const { user, foodOrderItems } = req.body;

    const foods = await foodModel.find({
      _id: {
        $in: foodOrderItems.map((item) => item.food),
      },
    });

    // const calculatedTotalprice = foodOrderItems.reduce((totalprice, item) => {
    //   const food = foods.filter((foodItem) => foodItem._id === item.food);

    //   return totalprice + food[0].price * item.quantity;
    // }, 0);
    const calculatedTotalprice = foodOrderItems.reduce((totalprice, item) => {
      const food = foods.find(
        (foodItem) => foodItem._id.toString() === item.food.toString()
      );

      if (!food) {
        throw new Error(`Food item not found for ID: ${item.food}`);
      }
      return totalprice + food.price * item.quantity;
    }, 0);

    await orderModel.create({
      user,
      totalPrice: calculatedTotalprice,
      foodOrderItems,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json({ message: "amjilttai" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};
