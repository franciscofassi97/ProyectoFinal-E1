const router = require("express").Router();

//Middlewares
const { middlewareAutenticacion, middlewareAutorizacion} = require("../middleware/auth")

//Controllers
const {
  saveProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");

//POST
router.post("/", middlewareAutenticacion, middlewareAutorizacion, saveProduct);

//GET
router.get("/:id?", middlewareAutenticacion, getProducts);

//PUT
router.put("/:id",middlewareAutenticacion, middlewareAutorizacion, updateProduct);

//Deleted
router.delete("/:id", middlewareAutenticacion, middlewareAutorizacion, deleteProduct);
module.exports = router;
