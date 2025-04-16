import { Schema, model } from "mongoose";
const foodSchema = new Schema({
  foodName: {
    type: String,
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },
});
export const foodModel = model("food", foodSchema);
