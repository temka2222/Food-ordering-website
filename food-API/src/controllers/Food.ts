import { foodModel } from "../models/food.model";
import { Request, RequestHandler, Response } from "express";

export const createFood: RequestHandler = async (req, res) => {
  const food = await foodModel.create(req.body);
  return res.status(200).json({ createfood: food });
};
