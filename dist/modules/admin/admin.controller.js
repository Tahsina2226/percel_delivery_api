"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateParcelStatus = exports.getAllParcels = void 0;
const express_1 = require("express");
const parcel_model_1 = require("../parcel/parcel.model");
const getAllParcels = async (_req, res) => {
    const parcels = await parcel_model_1.Parcel.find();
    res.json(parcels);
};
exports.getAllParcels = getAllParcels;
const updateParcelStatus = async (req, res) => {
    const parcel = await parcel_model_1.Parcel.findById(req.params.id);
    const { status, location, note } = req.body;
    if (!parcel)
        return res.status(404).json({ message: "Parcel not found" });
    parcel.currentStatus = status;
    parcel.statusLogs.push({
        status,
        location,
        note,
        updatedBy: req.user.id,
        timestamp: new Date(),
    });
    await parcel.save();
    res.json({ message: "Parcel status updated", parcel });
};
exports.updateParcelStatus = updateParcelStatus;
//# sourceMappingURL=admin.controller.js.map