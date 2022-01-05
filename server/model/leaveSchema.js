import mongoose, { mongo } from "mongoose";

const { String } = mongoose.Schema.Types;

const leaveSchema = new mongoose.Schema(
  {
    leave_type: {
      type: String,
      required: true,
    },
    fdate: {
      type: Date,
      required: true,
    },
    tdate: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    lstatus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("Leave", leaveSchema);
