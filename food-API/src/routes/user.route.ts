import { Router } from "express";
import { createUserController } from "../controllers/userController/create-user";

const userRouter = Router();

userRouter.post("/", createUserController);

export default userRouter;
