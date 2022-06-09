const router = require("express").Router();
//Controllers
const {
  saveCart,
  getCartById,
  addProduct,
  deleteProduct,
  deleteCart,
} = require("../controllers/cartController");

//POST
router.post("/", saveCart);
router.post("/:id/productos", addProduct);
//Get
router.get("/:id/productos", getCartById);

//DELETE
router.delete("/:id/productos/:id_prod", deleteProduct);
router.delete("/:id", deleteCart);
module.exports = router;
