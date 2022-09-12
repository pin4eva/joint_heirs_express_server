import { model, Schema, Types } from "mongoose";

export type EventDocument = Document & {
  _id: Types.ObjectId;
  // _doc: typeof EventSchema;
};

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  venue: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  imageUrl: { type: String, required: true },
  isSingleDate: { type: Boolean },
});

export const Event = model("Event", EventSchema);
