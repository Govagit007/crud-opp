const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name"],
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  images: { type: String, required: true },
  price: {
    type: Number,
    default: 0,
    maxLength: [8, "Price cannot exceed 8 digits"],
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    dafault: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
