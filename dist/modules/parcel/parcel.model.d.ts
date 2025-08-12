import mongoose, { Document } from "mongoose";
interface IStatusLog {
    status: string;
    location: string;
    note?: string;
    updatedBy: string;
    timestamp: Date;
}
export interface IParcel extends Document {
    type: string;
    weight: number;
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    pickupAddress: string;
    deliveryAddress: string;
    deliveryDate: Date;
    fee: number;
    trackingId: string;
    currentStatus: string;
    statusLogs: IStatusLog[];
    isBlocked: boolean;
}
export declare const Parcel: mongoose.Model<IParcel, {}, {}, {}, mongoose.Document<unknown, {}, IParcel, {}, {}> & IParcel & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export {};
//# sourceMappingURL=parcel.model.d.ts.map