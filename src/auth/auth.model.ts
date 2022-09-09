import { Document, model, Schema, Types } from "mongoose";

export type AuthDocument = Document & {
  _id: Types.ObjectId;
  _doc: typeof AuthSchema;
};

const AuthSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleId: String,
  profile: { type: Types.ObjectId, ref: "User" },
});

export const Auth = model("Auth", AuthSchema);
