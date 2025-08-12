"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyParcels = exports.cancelParcel = exports.createParcel = void 0;
const express_1 = require("express");
const parcel_model_1 = require("./parcel.model");
const createParcel = async (req, res) => {
    if (!req.user)
        return res.status(401).json({ message: "Unauthorized" });
    const { type, weight, receiver, pickupAddress, deliveryAddress, deliveryDate, fee, } = req.body;
    const parcel = await parcel_model_1.Parcel.create({
        type,
        weight,
        sender: req.user.id,
        receiver,
        pickupAddress,
        deliveryAddress,
        deliveryDate,
        fee,
        statusLogs: [
            {
                status: "Requested",
                location: pickupAddress,
                updatedBy: req.user.id,
                timestamp: new Date(),
            },
        ],
    });
    res.status(201).json({ message: "Parcel created", parcel });
};
exports.createParcel = createParcel;
const cancelParcel = async (req, res) => {
    if (!req.user)
        return res.status(401).json({ message: "Unauthorized" });
    const parcel = await parcel_model_1.Parcel.findById(req.params.id);
    if (!parcel)
        return res.status(404).json({ message: "Parcel not found" });
    if (parcel.sender.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not your parcel" });
    }
    if (parcel.currentStatus !== "Requested") {
        return res
            .status(400)
            .json({ message: "Parcel cannot be cancelled after dispatch" });
    }
    parcel.currentStatus = "Cancelled";
    parcel.statusLogs.push({
        status: "Cancelled",
        location: parcel.pickupAddress,
        updatedBy: req.user.id,
        timestamp: new Date(),
    });
    await parcel.save();
    res.json({ message: "Parcel cancelled", parcel });
};
exports.cancelParcel = cancelParcel;
const getMyParcels = async (req, res) => {
    if (!req.user)
        return res.status(401).json({ message: "Unauthorized" });
    const parcels = await parcel_model_1.Parcel.find({ sender: req.user.id });
    res.json(parcels);
};
exports.getMyParcels = getMyParcels;
//# sourceMappingURL=parcel.controller.js.map