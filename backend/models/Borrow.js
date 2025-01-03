import mongoose from "mongoose";

const { Schema } = mongoose;

const borrowSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    borrowDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["borrowed", "returned"],
      default: "borrowed",
    },
  },
  {
    timestamps: true, 
  }
);

const Borrow = mongoose.model("Borrow", borrowSchema);
export default Borrow;
