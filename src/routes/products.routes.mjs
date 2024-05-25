import { Router } from "express";
import productDao from "../dao/mongoDao/product.dao.mjs";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productDao.getAll();
    res.status(200).json({ status: "success", payload: products });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productDao.getById(id);
    if (!product)
      return res
        .status(404)
        .json({ status: "Error", msg: `Producto no encontrado con id: ${id}` });
    res.status(200).json({ status: "success", payload: product });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await productDao.create(product);
    // Cuando se ha creado algo nuevo va el status 201
    res.status(201).json({ status: "success", payload: newProduct });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productDao.deleteOne(id);
    if (!product)
      return res
        .status(404)
        .json({ status: "Error", msg: `Producto no encontrado con id: ${id}` });
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;
    const updatedProduct = await productDao.update(id, productData);
    if (!updatedProduct)
      return res
        .status(404)
        .json({ status: "Error", msg: `Producto no encontrado con id: ${id}` });
    res.status(200).json({ status: "success", payload: updatedProduct });
  } catch (error) {
    console.log(error);
  }
});

export default router;
