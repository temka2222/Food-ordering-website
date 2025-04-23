import { Router } from "express";
import { createOrderController } from "../controllers/ordersController/create-order";
import { getOrderController } from "../controllers/ordersController/get-orders";

const orderRouter = Router();

orderRouter.post("/", createOrderController).get("/", getOrderController);

export default orderRouter;
