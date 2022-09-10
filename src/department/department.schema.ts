import { model, Schema, Types } from "mongoose";

const DepartmentSchema = new Schema({
  name: { type: String, required: true },
  members: { type: [{ type: Types.ObjectId, ref: "User" }] },
  hod: { type: Types.ObjectId, ref: "User" },
});

export const Department = model("Department", DepartmentSchema);
