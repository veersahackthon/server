const mongoose = require("mongoose");

const FavSchema = new mongoose.Schema(
  {
    usedId: {
      type: String,
      required: true,
    },
    Blogs: [
      {
        BlogId: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true },
  {
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 1000,
    },
  },
);
