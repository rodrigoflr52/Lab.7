const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  post_date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  post_data: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("NewPost", PostSchema);