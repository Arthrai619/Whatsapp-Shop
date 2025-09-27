const {getUser, addUser, updateUser, deleteUser} = require("../controller/userController")

const route = require("express").Router()

route.get("/", getUser)
route.post("/", addUser)
route.post("/login", updateUser)
route.post("/login", deleteUser)

module.exports = route
