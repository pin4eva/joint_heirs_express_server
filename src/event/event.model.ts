import { model, Schema, Types } from "mongoose";

export type EventDocument = Document & {
  _id: Types.ObjectId;
  _doc: typeof EventSchema;
};

const EventSchema = new Schema({
  title: { type: String },
  description: { type: String },
  category: { type: String },
  venue: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  imageUrl: { type: String },
});

export const Event = model("Event", EventSchema);
