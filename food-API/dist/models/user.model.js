"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    PhoneNimber: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    orderedFoods: {
        type: String,
        required: false,
    },
    ttl: {
        type: Date,
        required: true,
    },
    isVerified: {
        type: Boolean,
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
exports.userModel = (0, mongoose_1.model)("food", userSchema);
//# sourceMappingURL=user.model.js.map