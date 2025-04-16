"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_to_db_1 = require("./database/connect-to-db");
const food_route_1 = __importDefault(require("./routes/food.route"));
(0, connect_to_db_1.connectToDatabase)();
const express = require("express");
const app = express();
const port = 3001;
app.use(food_route_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map