import { Schema, model } from "mongoose";
const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  default: Date.now,
  },
});
export const categoryModel = model("category", categorySchema);
