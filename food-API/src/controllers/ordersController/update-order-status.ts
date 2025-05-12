import { Request, Response } from "express";
import { orderModel } from "../../models/orders.model";

export const updateOrderStatusController = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    const a = await orderModel.findByIdAndUpdate(
      orderId,
      {
        status,
      },
      { new: true }
    );

    console.log(a);
    res.status(201).json({ message: "amjilttai" });
  } catch (error) {
    console.error(error);
  }
};
