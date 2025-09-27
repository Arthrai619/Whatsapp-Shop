const {getProduct, addProduct, updateProduct, deleteProduct} = require("../controller/productController")

const route = require("express").Router()

route.get("/", getProduct)
route.post("/", addProduct)
route.put("/:id", updateProduct)
route.delete("/:id", deleteProduct)

module.exports = route