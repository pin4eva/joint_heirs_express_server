import { Document, model, Schema, Types } from "mongoose";

export type SermonDocument = Document & {
  _id: Types.ObjectId;
};

const SermonSchema = new Schema({
  videoLink: { type: String, required: true },
  audioLink: { type: String, required: true },
  text: { type: String, required: true },
  imageTumbnail: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  title: { type: String, required: true },
  sermonBy: { type: String, required: true },
});

export const Sermon = model("Sermon", SermonSchema);
