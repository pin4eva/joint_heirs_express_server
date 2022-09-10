import { model, Schema, Types } from "mongoose";

export type EventDocument = Document & {
  _id: Types.ObjectId;
  _doc: typeof EventSchema;
};

const EventSchema = new Schema({
  general: { type: String },
  children: { type: String },
  men: { type: String },
  women: { type: String },
  youth: { type: String },
});

export const Event = model("Event", EventSchema);
