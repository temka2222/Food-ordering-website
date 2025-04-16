import { Router } from "express";
import { getFoodController } from "../controllers/foodController/getFoodController";
import { createFoodController } from "../controllers/foodController/createFoodController";
import { getCategoryController } from "../controllers/categoriesController.ts/getCategoryController";
import { createCategoryController } from "../controllers/categoriesController.ts/createCategoryController";

const categoryRouter = Router();

categoryRouter
  .get("/", getCategoryController)
  .post("/", createCategoryController);

export default categoryRouter;
