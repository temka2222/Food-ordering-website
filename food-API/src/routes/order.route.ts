import { Router } from "express";
import { createOrderController } from "../controllers/ordersController/create-order";
import { getOrderController } from "../controllers/ordersController/get-orders";
import { updateOrderStatusController } from "../controllers/ordersController/update-order-status";

const orderRouter = Router();

orderRouter
  .post("/", createOrderController)
  .get("/", getOrderController)
  .put("/update-status", updateOrderStatusController);

export default orderRouter;
