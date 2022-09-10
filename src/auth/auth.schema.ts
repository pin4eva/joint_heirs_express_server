import { model, Schema, Types } from "mongoose";

interface IAuth {
  email: string;
  password: string;
  googleId: string;
  profile: Schema.Types.ObjectId;
}
const AuthSchema = new Schema<IAuth>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleId: String,
  profile: { type: Types.ObjectId, ref: "User" },
});

export const Auth = model<IAuth>("Auth", AuthSchema);
