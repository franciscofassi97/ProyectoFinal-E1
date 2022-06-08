const Contenedor = require("../models/Contenedor");

const contenedorProductos = new Contenedor("productos.json");

const saveProduct = async (req, res) => {
  try {
    const { nombre, descripcion, codigo, fotoUrl, precio, stock } = req.body;
    const newProduct = { nombre, descripcion, codigo, fotoUrl, precio, stock };

    const id = await contenedorProductos.save(newProduct);

    res.status(200).json({ id });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const getProducts = async (req, res) => {
  const id = req.params.id;

  try {
    if (id) {
      const productById = await contenedorProductos.getById(id);
      if (productById) return res.status(200).json(productById);
      else throw new Error("No se ha encontrado el producto");
    } else {
      const products = await contenedorProductos.getAll();
      if (products) return res.status(200).json(products);
      else throw new Error("No se ha encontrado el producto");
    }
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const { nombre, descripcion, codigo, fotoUrl, precio, stock } = req.body;
    const newProduct = {
      nombre,
      descripcion,
      codigo,
      fotoUrl,
      precio,
      stock,
    };

    const idActualizado = await contenedorProductos.updateById(id, newProduct);
    if (idActualizado)
      res
        .status(201)
        .json({ message: `Producto ${idActualizado} actualizado` });
    else throw new Error("No se ha encontrado el producto");
  } catch (error) {
    return res.status(400).json({
      erorr: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const productDeleted = await contenedorProductos.deleteById(id);
      console.log(productDeleted);
      if (productDeleted)
        res.status(200).json({ message: "Producto eliminado con exito" });
      else throw new Error("No se ha encontrado el producto");
    }
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  saveProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
