import { Request, Response } from "express";
import { Parcel } from "./parcel.model";

export const createParcel = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const {
    type,
    weight,
    receiver,
    pickupAddress,
    deliveryAddress,
    deliveryDate,
    fee,
  } = req.body;

  const parcel = await Parcel.create({
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

export const cancelParcel = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const parcel = await Parcel.findById(req.params.id);
  if (!parcel) return res.status(404).json({ message: "Parcel not found" });

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

export const getMyParcels = async (req: Request, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });

  const parcels = await Parcel.find({ sender: req.user.id });
  res.json(parcels);
};
