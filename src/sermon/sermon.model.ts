import { Document, model, Schema, Types } from "mongoose";

export type SermonDocument = Document & {
  _id: Types.ObjectId;
};

const SermonSchema = new Schema({
  videoLink: { type: String },
  audioLink: { type: String },
  body: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: Date, required: true },
  title: { type: String, required: true },
  sermonBy: { type: String, required: true },
});

export const Sermon = model("Sermon", SermonSchema);
