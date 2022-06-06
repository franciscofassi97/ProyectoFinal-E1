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

app.use("/api/productos", routerProductos);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
