import { cartModel } from "../models/cart.model.mjs";
import { productModel } from "../models/product.model.mjs";

const getAll = async () => {
  const carts = await cartModel.find();
  return carts;
};

const getById = async (cid) => {
  const cart = await cartModel.findOne({ _id: cid });
  return cart;
};

const create = async (data) => {
  const cart = await cartModel.create(data);
  return cart;
};

const deleteOne = async (cid) => {
  const cart = await cartModel.deleteOne({ _id: cid });
  if (cart.deletedCount === 0) return false;
  return true;
};

const addProductToCart = async (cid, pid, quantity = 1) => {
  const product = await productModel.findOne({ _id: pid });
  if (!product) return { product: false };
  const cart = await cartModel.findOne({ _id: cid });
  if (!cart) return { cart: false };

  const productInCart = await cartModel.findOneAndUpdate(
    { _id: cid, "products.product": pid },
    { $inc: { "products.$.quantity": quantity } }
  );

  if (!productInCart) {
    await cartModel.findOneAndUpdate(
      { _id: cid },
      { $push: { products: { product: pid, quantity } } }
    );
  }

  const cartUpdate = await cartModel.findOne({ _id: cid });
  return cartUpdate;
};

const clearCart = async (cid) => {
  const cart = await cartModel.findOne({ _id: cid });
  if (!cart) return {};
  const cartEmpty = await cartModel.findOneAndUpdate(
    { _id: cid },
    { $set: { products: [] } },
    { new: true }
  );
  return cartEmpty;
};

export default {
  getAll,
  getById,
  create,
  deleteOne,
  addProductToCart,
  clearCart,
};
