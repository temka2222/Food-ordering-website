import { userModel } from "../../models/user.model";

export const createUserController = async (req, res) => {
  try {
    const { email, password, phoneNumber, address } = req.body;
    await userModel.create({
      email,
      password,
      phoneNumber,
      address,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json({ message: "amjilttai" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
