import { Router } from "express";
import { getFoodController } from "../controllers/foodController/getFoodController";
import { createFoodController } from "../controllers/foodController/createFoodController";
import { updateFoodController } from "../controllers/foodController/putFoodController";
import { deleteteFoodController } from "../controllers/foodController/deleteFoodControllers";

const foodRouter = Router();

foodRouter
  .get("/", getFoodController)
  .post("/", createFoodController)
  .put("/", updateFoodController)
  .delete("/", deleteteFoodController);

export default foodRouter;
