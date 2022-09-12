import { model, Schema, Types } from "mongoose";

export class IDepartment {
  name: string;
  members: Schema.Types.ObjectId[];
  hod: Schema.Types.ObjectId;
}

const DepartmentSchema = new Schema<IDepartment>({
  name: { type: String, required: true },
  members: { type: [{ type: Types.ObjectId, ref: "User" }] },
  hod: { type: Types.ObjectId, ref: "User" },
});

export const Department = model<IDepartment>("Department", DepartmentSchema);
