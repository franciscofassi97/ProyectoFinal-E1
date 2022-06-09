const Contenedor = require("../models/Contenedor");
const contenedorCarrito = new Contenedor("carrito.json");
const contenedorProductos = new Contenedor("productos.json");

const saveCart = async (req, res) => {

  try {
    const cart = {
      timestamp: new Date(),
      products: [],
    };
    const id = await contenedorCarrito.save(cart);

    if (id) return res.status(200).json({ id });
    else throw new Error("No fue posible crear el carrito");

  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const getCartById = async (req, res) => {
  const id = req.params.id;
  try {
    const carritoById = await contenedorCarrito.getById(id);
      
    if (carritoById) return res.status(200).json(carritoById);
    else throw new Error(`No fue posible encontrar el carrito con id ${id}`);
    
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const addProductToCart = async (req, res) => {
  const idCart = req.params.id;
  const { idProducto } = req.body;

  try {
    if (idProducto) {
      const cart = await contenedorCarrito.getById(idCart);
      const product = await contenedorProductos.getById(idProducto);
      if (cart && product) {
        cart.products.push(product);
        await contenedorCarrito.updateById(idCart, cart);
        return res.status(200).json(cart);
      } else throw new Error("Carrito o producto no encontrado");
    } else
      throw new Error("Es necesario el id del producto");

  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const removeProductFromCart = async (req, res) => {
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
      return res.status(200).json(cart);
    }
    else throw new Error("No se encontro el carrito");

  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const removeCart = async (req, res) => {
  const id = req.params.id;
  try {
    
    const cartDeleted = await contenedorCarrito.deleteById(id);
    if (cartDeleted) return res.status(200).json(cartDeleted);
    else throw new Error(`No fue posible eliminar el carrito con id ${id}`);
   
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  saveCart,
  getCartById,
  addProductToCart,
  removeProductFromCart,
  removeCart,
};
