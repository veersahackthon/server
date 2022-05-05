const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    subheading: {
      type: Array,
      required: true,
    },
    subcontent: {
      type: Array,
      required: true,
    },
    Category: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: true,
    },
    img: {
      type: Array,
      reuired: true,
    },
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
