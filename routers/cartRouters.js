const router = require("express").Router();
//Controllers
const {
  saveCart,
  getCartById,
  addProductToCart,
  removeProductFromCart,
  removeCart,
} = require("../controllers/cartController");

//POST
router.post("/", saveCart);
router.post("/:id/productos", addProductToCart);
//Get
router.get("/:id/productos", getCartById);

//DELETE
router.delete("/:id/productos/:id_prod", removeProductFromCart);
router.delete("/:id", removeCart);
module.exports = router;
