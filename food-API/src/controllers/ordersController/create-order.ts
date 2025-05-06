import { orderModel } from "../../models/orders.model";

export const createOrderController = async (req, res) => {
  try {
    const { user, totalPrice, foodOrderItems } = req.body;

    // const calculatedTotalprice=foodOrderItems.reduce(())

    await orderModel.create({
      user,
      totalPrice,
      foodOrderItems,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json({ message: "amjilttai" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
