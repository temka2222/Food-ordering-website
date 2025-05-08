import { RequestHandler } from "express";
import { userModel } from "../../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const signIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const { password: hashedPassword, ...userWithoutPassword } =
      user.toObject();

    const IsPasswordMatch = await bcrypt.compare(password, hashedPassword);

    if (!IsPasswordMatch) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.role === "admin" },
      process.env.JWT_SECRET
    );
    res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
