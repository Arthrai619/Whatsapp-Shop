const {getCategory, addCategory, updateCategory, deleteCategory} = require("../controller/categoryController")

const route = require("express").Router()

route.get("/", getCategory)
route.post("/", addCategory)
route.put("/:id", updateCategory)
route.delete("/:id", deleteCategory)

module.exports = route