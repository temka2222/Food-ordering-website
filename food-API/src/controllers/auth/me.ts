import { RequestHandler } from "express";
import { userModel } from "../../models/user.model";

export const getMe: RequestHandler = async (req, res) => {
  try {
    const userId = req.userId;
    const user = (await userModel.findById(userId)).isSelected("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
