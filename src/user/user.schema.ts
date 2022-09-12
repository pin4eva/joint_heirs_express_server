import { Document, model, Schema } from "mongoose";

export type UserDocument = Document & IUser;
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
