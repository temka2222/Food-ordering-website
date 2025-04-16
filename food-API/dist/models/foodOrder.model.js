"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodOrderModel = void 0;
const mongoose_1 = require("mongoose");
const foodOrderSchema = new mongoose_1.Schema({
    user: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    foodOrderItems: {
        type: String,
        required: true,
    },
    status: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    updateAt: {
        type: Date,
        required: true,
    },
});
exports.foodOrderModel = (0, mongoose_1.model)("food", foodOrderSchema);
//# sourceMappingURL=foodOrder.model.js.map