import { Schema, model } from "mongoose";
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  PhoneNimber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  orderedFoods: {
    type: String,
    required: false,
  },
  ttl: {
    type: Date,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updateAt: {
    type: Date,
    required: true,
  },
});
export const userModel = model("food", userSchema);
