const router = require("express").Router();

//Middlewares
const { middlewareAutenticacion } = require("../middleware/auth")

//Controllers
const {
  saveCart,
  getCartById,
  addProductToCart,
  removeProductFromCart,
  removeCart,
} = require("../controllers/cartController");

//POST
router.post("/", middlewareAutenticacion, saveCart);
router.post("/:id/productos", middlewareAutenticacion, addProductToCart);
//Get
router.get("/:id/productos", middlewareAutenticacion, getCartById);

//DELETE
router.delete("/:id/productos/:id_prod", middlewareAutenticacion, removeProductFromCart);
router.delete("/:id", middlewareAutenticacion, removeCart);

module.exports = router;
