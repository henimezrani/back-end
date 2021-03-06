const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  email: {
    unique: true,
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  image: {
    type: String
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product"
    }
  ]
});

module.exports = mongoose.model("Brand", brandSchema);
