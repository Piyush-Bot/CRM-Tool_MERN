const mongoose = require("mongoose");

const { String, Number, ObjectId } = mongoose.Schema.Types;

const leaveSchema = new mongoose.Schema({
  leaveType: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fDate: {
    type: Number,
    required: true,
  },
  tDate: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  leaveStatus: {
    type: String,
    required: true,
  },
  approverId: {
    type: ObjectId,
    required: true,
  },
  empId: {
    type: ObjectId,
    required: false,
  },
});

const Leave = mongoose.model("Leave", leaveSchema);
module.exports = Leave;
