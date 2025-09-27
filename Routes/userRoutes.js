const {getUser, addUser, updateUser, deleteUser, loginUser} = require("../controller/userController")

const route = require("express").Router()

route.get("/", getUser)
route.post("/", addUser)
route.post("/login", addUser)
route.put("/:id", updateUser)
route.delete("/:id", deleteUser)

module.exports = route
