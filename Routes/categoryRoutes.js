const {getCategory, addCategory, updateCategory, deleteCategory} = require("../controller/categoryController")
const auth = require("../Middleware/auth")
const route = require("express").Router()

route.get("/", getCategory)
route.post("/", auth, addCategory)
route.put("/:id", auth, updateCategory)
route.delete("/:id", auth, deleteCategory)

module.exports = route
