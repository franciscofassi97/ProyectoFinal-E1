const Contenedor = require("../models/Contenedor");
const contenedorProductos = new Contenedor("productos.json");

const saveProduct = async (req, res) => {
  try {
    const { nombre, descripcion, codigo, fotoUrl, precio, stock } = req.body;
    const newProduct = {
      timestamp: new Date(),
      nombre,
      descripcion,
      codigo,
      fotoUrl,
      precio,
      stock,
    };

    const id = await contenedorProductos.save(newProduct);
    res.status(201).json({ id });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
      message: `El error es ${error}`,
    });
  }
};

module.exports = {
  saveProduct,
};
