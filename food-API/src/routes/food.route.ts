import { Router } from "express";
import express from "express";
import { createFood } from "../controllers/Food";

const foodRouter = express.Router();

foodRouter.post("/", createFood);

export default foodRouter;
