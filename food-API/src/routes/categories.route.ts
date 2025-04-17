import { Router } from "express";
import { getCategoryController } from "../controllers/categoriesController.ts/getCategoryController";
import { createCategoryController } from "../controllers/categoriesController.ts/createCategoryController";

const categoryRouter = Router();

categoryRouter
  .get("/", getCategoryController)
  .post("/", createCategoryController);

export default categoryRouter;
