import { orderModel } from "../../models/orders.model";

export const createOrderController = async (req, res) => {
  try {
    const { user, totalPrice, foodOrderItems, status } = req.body;
    await orderModel.create({
      user,
      totalPrice,
      foodOrderItems,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json({ message: "amjilttai" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
