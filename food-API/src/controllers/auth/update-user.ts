import { RequestHandler } from "express";
import { userModel } from "../../models/user.model";

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const { userAddress } = req.body;
    await userModel.findByIdAndUpdate(userId, {
      address: userAddress,
    });

    res.status(200).json();
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
