import { orderModel } from "../../models/orders.model";

export const getOrderController = async (req, res) => {
  const { user } = req.query;
  try {
    const orders = await orderModel
      .find(user ? { user: user } : {})
      .populate(["user", "foodOrderItems.food"]);
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
