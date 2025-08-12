"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const express_1 = require("express");
const user_model_1 = require("../user/user.model");
const generateToken_1 = require("../../utils/generateToken");
const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    const existingUser = await user_model_1.User.findOne({ email });
    if (existingUser)
        return res.status(400).json({ message: "User already exists" });
    const user = await user_model_1.User.create({ name, email, password, role });
    res.status(201).json({
        message: "Registered successfully",
        token: (0, generateToken_1.generateToken)(user._id.toString(), user.role),
        user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await user_model_1.User.findOne({ email });
    if (!user || user.isBlocked || !(await user.comparePassword(password))) {
        return res
            .status(401)
            .json({ message: "Invalid credentials or user blocked" });
    }
    res.json({
        message: "Login successful",
        token: (0, generateToken_1.generateToken)(user._id.toString(), user.role),
        user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map