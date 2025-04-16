"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodModel = void 0;
const mongoose_1 = require("mongoose");
const foodSchema = new mongoose_1.Schema({
    foodName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
});
exports.foodModel = (0, mongoose_1.model)("food", foodSchema);
//# sourceMappingURL=food.model.js.map