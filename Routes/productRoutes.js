const {getProduct, addProduct, updateProduct, deleteProduct} = require("../controller/productController")
const auth = require("../Middleware/auth")
const route = require("express").Router()

route.get("/", getProduct)
route.post("/", auth, addProduct)
route.put("/:id", auth, updateProduct)
route.delete("/:id", auth, deleteProduct)

module.exports = route
