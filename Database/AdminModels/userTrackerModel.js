const mongoose = require('mongoose');

const trackerSchema = new mongoose.Schema(
  {
    ip: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    region: { type: String, required: true },
    city: { type: String, required: true },
  },
  {
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000,
    },
  }
);
module.exports = mongoose.model('UserTracker', trackerSchema);
