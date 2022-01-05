import mongoose, { mongo } from "mongoose";

const { String } = mongoose.Schema.Types;

const purchaseSchema = new mongoose.Schema(
  {
    pono: {
      type: Date,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    gstn: {
      type: Number,
      required: true,
    },
    pan: {
      type: String,
      required: true,
    },
    term: {
      type: String,
      required: true,
    },
    totalAmt: {
      type: Number,
      required: true,
    },
    gst: {
      type: Number,
      required: true,
    },
    gstAmt: {
      type: Number,
      required: true,
    },
    finalAmt: {
      type: Number,
      required: true,
    },
    item: [
      description: {
      type: String,
      required: true,
    },quantity: {
      type: Number,
      required: true,
    },price: {
      type: Number,
      required: true,
    },commercials: {
      type: Number,
      required: true,
      }
    ],
  }
);

export default mongoose.models.User ||
  mongoose.model("PurchaseOrder", purchaseSchema);
