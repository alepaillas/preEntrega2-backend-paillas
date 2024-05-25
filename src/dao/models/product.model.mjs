import mongoose from "mongoose";

const productCollection = "products";

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  thumbnail: {
    type: Array,
    default: [],
    require: true,
  },
  code: {
    type: String,
    unique: true,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
    require: true,
  },
});

// Moodelo utilizado para manejar la base de datos
export const productModel = mongoose.model(productCollection, productsSchema);
