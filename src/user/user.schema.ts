import { Document, model, Schema, Types } from "mongoose";

export type UserDocument = Document & { _id: Types.ObjectId };
class IUser {
  email: string;
  name: string;
  image: string;
  id: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true },
  name: { type: String },
  image: String,
});

export const User = model<IUser>("User", UserSchema);
