"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmDelivery = exports.getIncomingParcels = void 0;
const express_1 = require("express");
const parcel_model_1 = require("../parcel/parcel.model");
const getIncomingParcels = async (req, res) => {
    const parcels = await parcel_model_1.Parcel.find({ receiver: req.user.id });
    res.json(parcels);
};
exports.getIncomingParcels = getIncomingParcels;
const confirmDelivery = async (req, res) => {
    const parcel = await parcel_model_1.Parcel.findById(req.params.id);
    if (!parcel)
        return res.status(404).json({ message: "Parcel not found" });
    if (parcel.receiver.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not your parcel" });
    }
    if (parcel.currentStatus !== "In Transit") {
        return res
            .status(400)
            .json({ message: "Cannot confirm unless in transit" });
    }
    parcel.currentStatus = "Delivered";
    parcel.statusLogs.push({
        status: "Delivered",
        location: parcel.deliveryAddress,
        updatedBy: req.user.id,
        timestamp: new Date(), // এখানে timestamp দিতে হবে
    });
    await parcel.save();
    res.json({ message: "Parcel delivery confirmed", parcel });
};
exports.confirmDelivery = confirmDelivery;
//# sourceMappingURL=receiver.controller.js.map