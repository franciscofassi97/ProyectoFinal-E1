const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

//Middleware
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Router
const routerProductos = require("./routers/productsRouters");
const routerCarrito = require("./routers/cartRouters");

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

app.use((req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
