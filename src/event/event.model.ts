import { model, Schema, Types } from "mongoose";

export type EventDocument = Document & {
  _id: Types.ObjectId;
  // _doc: typeof EventSchema;
};
export enum EventCategoryEnum {
  "General",
  "Men",
  "Women",
  "Youths",
  "Children",
}

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: EventCategoryEnum,
    default: EventCategoryEnum.General,
  },
  venue: { type: String, default: "Joint Heirs Assembly HQ" },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  image: { type: String, required: true },
  isSingleDate: { type: Boolean, default: false },
});

export const Event = model("Event", EventSchema);
