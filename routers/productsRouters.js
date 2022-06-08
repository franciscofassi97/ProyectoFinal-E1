const router = require("express").Router();
//Controllers
const {
  saveProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");

//POST
router.post("/", saveProduct);

//GET
router.get("/:id?", getProducts);

//PUT
router.put("/:id", updateProduct);

//Deleted
router.delete("/:id", deleteProduct);
module.exports = router;
