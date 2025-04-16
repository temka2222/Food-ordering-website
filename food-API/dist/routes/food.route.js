"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Food_1 = require("../controllers/Food");
const foodRouter = express_1.default.Router();
foodRouter.post("/food", Food_1.createFood);
exports.default = foodRouter;
//# sourceMappingURL=food.route.js.map