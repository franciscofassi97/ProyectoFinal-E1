const Contenedor = require("../models/Contenedor");
const contenedorCarrito = new Contenedor("carrito.json");
const contenedorProductos = new Contenedor("productos.json");
const fs = require("fs");
const saveCart = async (req, res) => {
  try {
    const cart = {
      timestamp: new Date(),
      products: [],
    };
    const id = await contenedorCarrito.save(cart);
    return res.status(200).json({ id });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const getCartById = async (req, res) => {
  try {
    const id = req.params.id;
    const carritoById = await contenedorCarrito.getById(id);
    return res.status(200).json({ carritoById });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const addProduct = async (req, res) => {
  const idCart = req.params.id;
  const { idProducto } = req.body;

  try {
    const cart = await contenedorCarrito.getById(idCart);
    const product = await contenedorProductos.getById(idProducto);
    if (cart) {
      cart.products.push(product);
      await contenedorCarrito.updateById(idCart, cart);
      return res.status(200).json({ cart });
    } else throw new Error("No se ha encontrado el carrito");
  } catch (error) {
    console.log("error", error);
  }
};

const deleteProduct = async (req, res) => {
  const idCart = req.params.id;
  const idProducto = req.params.id_prod;

  try {
    let cart = await contenedorCarrito.getById(idCart);
    if (cart) {
      const index = cart.products.findIndex(
        (product) => product.id == idProducto
      );
      cart.products.splice(index, 1);
      cart = await contenedorCarrito.updateById(idCart, cart);
      return res.status(200).json({ cart });
    }
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const deleteCart = async (req, res) => {
  const id = req.params.id;
  try {
    const cartDeleted = await contenedorCarrito.deleteById(id);
    return res.status(200).json({ cartDeleted });
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = {
  saveCart,
  getCartById,
  addProduct,
  deleteProduct,
  deleteCart,
};
