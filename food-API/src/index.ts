import { connectToDatabase } from "./database/connect-to-db";
import categoryRouter from "./routes/categories.route";
import foodRouter from "./routes/food.route";
import express from "express";
import cors from "cors";
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use("/food", foodRouter);
app.use("/category", categoryRouter);

app.get("/", (req, res) => {
  res.json("connected");
});
app.listen(port, () => {
  connectToDatabase();
  console.log(`Example app listening on port ${port}`);
});
