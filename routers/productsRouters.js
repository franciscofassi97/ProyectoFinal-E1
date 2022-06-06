const router = require("express").Router();
//Controllers
const { saveProduct } = require("../controllers/productsController");

//POST
router.post("/", saveProduct);

module.exports = router;
