"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unblockUser = exports.blockUser = exports.getAllUsers = void 0;
const express_1 = require("express");
const user_model_1 = require("./user.model");
const getAllUsers = async (_req, res) => {
    const users = await user_model_1.User.find().select("-password");
    res.json(users);
};
exports.getAllUsers = getAllUsers;
const blockUser = async (req, res) => {
    const user = await user_model_1.User.findByIdAndUpdate(req.params.id, { isBlocked: true }, { new: true });
    if (!user)
        return res.status(404).json({ message: "User not found" });
    res.json({ message: "User blocked" });
};
exports.blockUser = blockUser;
const unblockUser = async (req, res) => {
    const user = await user_model_1.User.findByIdAndUpdate(req.params.id, { isBlocked: false }, { new: true });
    if (!user)
        return res.status(404).json({ message: "User not found" });
    res.json({ message: "User unblocked" });
};
exports.unblockUser = unblockUser;
//# sourceMappingURL=user.controller.js.map