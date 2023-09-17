import { Schema, model, Types } from "mongoose";

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      unique: [true, "title is unique"],
      lowercase: true
    },
    content: {
      type: String,
      required: [true, "content is required"],
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const noteModel = model("Note", noteSchema);
export default noteModel;
