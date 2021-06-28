const mongoose = require("mongoose");

const styleSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  season: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  image: {
    type: String,
    require: true,
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("Style", styleSchema);
