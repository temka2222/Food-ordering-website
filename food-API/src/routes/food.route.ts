import { Router } from "express";
import { createFoodController } from "../controllers/foodController/create-food";
import { updateFoodController } from "../controllers/foodController/update-foods-by-id";
import { deleteteFoodController } from "../controllers/foodController/delete-food-by-id";
import { getFoodsBycategory } from "../controllers/foodController/get-foods-by-category";
import { getCountFoodsBycategory } from "../controllers/foodController/count-foods-category";
import { getFoodController } from "../controllers/foodController/get-food-by-id";

const foodRouter = Router();

foodRouter
  .get("/", getFoodsBycategory)
  .post("/", createFoodController)
  .put("/:id", updateFoodController)
  .delete("/", deleteteFoodController)
  .get("/count", getCountFoodsBycategory);

export default foodRouter;
