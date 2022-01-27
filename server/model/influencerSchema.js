const mongoose = require("mongoose");

const influencerSchema = new mongoose.Schema({
  s_no: {
    type: Number,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  platform: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  handle: {
    type: String,
    required: false,
  },
  genre: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    default: false,
  },
  state: {
    type: String,
    required: false,
  },
  followers: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    default: false,
  },
  contact_no: {
    type: Number,
    default: false,
  },
});

//collection creation
const Influencer = mongoose.model("Influencer", influencerSchema);
module.exports = Influencer;
