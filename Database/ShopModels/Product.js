const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String},
    categories: { type: Array },
    size: { type: Array },
    price: { type: Number, required: true },
    discountprice: { type: Number },
    rating: { type: Number },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true },
  {
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000,
    },
  }
);

module.exports = mongoose.model('productData', productSchema);
