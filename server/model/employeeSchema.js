import mongoose, { mongo } from "mongoose";

const { String } = mongoose.Schema.Types;

const EmployeeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    account_access: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },

    phone: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    doj: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User ||
  mongoose.model("Employee", EmployeeSchema);
