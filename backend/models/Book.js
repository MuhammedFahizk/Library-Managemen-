import { model, Schema } from "mongoose";

const bookSchema = new Schema({
  uploadUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  pubYear: {
    type: String,
    required: true,
  },
  availableCopies: {
    type: Number,
    default: 1,
  },
  //   coverImg: {
  //     type: String
  //   }
},
{
    timestamps: true,
  }
);

export const Book = model("Book", bookSchema);
