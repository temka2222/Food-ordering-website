import { Schema, model } from "mongoose";
const foodOrderSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  foodOrderItems: {
    type: String,
    required: true,
  },
  status: {
    type: Date,
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
export const foodOrderModel = model("food", foodOrderSchema);
