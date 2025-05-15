import { connectToDatabase } from "../src/database/connect-to-db";
import categoryRouter from "../src/routes/categories.route";
import foodRouter from "../src/routes/food.route";
import express from "express";
import cors from "cors";
import { config } from "dotenv";
import orderRouter from "../src/routes/order.route";
import { authRouter } from "../src/routes/auth.route";
config();
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use("/food", foodRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);
app.use("/auth", authRouter);
app.get("/", (req, res) => {
  res.json("connected");
});
app.listen(port, () => {
  connectToDatabase();
  console.log(`Example app listening on port ${port}`);
});
