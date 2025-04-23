import { orderModel } from "../../models/orders.model";

export const getOrderController = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
