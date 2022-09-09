import { Document, model, Schema, Types } from "mongoose";

export type UserDocument = Document & { _id: Types.ObjectId };

const UserSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String },
});

export const User = model("User", UserSchema);
