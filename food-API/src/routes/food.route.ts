import { Router } from "express";
import { createFoodController } from "../controllers/foodController/create-food";
import { updateFoodController } from "../controllers/foodController/update-foods-by-id";
import { deleteteFoodController } from "../controllers/foodController/delete-food-by-id";
import { getFoodsBycategory } from "../controllers/foodController/get-foods-by-category";

const foodRouter = Router();

foodRouter
  .get("/", getFoodsBycategory)
  .post("/", createFoodController)
  .put("/", updateFoodController)
  .delete("/", deleteteFoodController);

export default foodRouter;
