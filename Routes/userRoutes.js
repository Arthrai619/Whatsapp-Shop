const {
    getUser, 
    addUser, 
    updateUser, 
    deleteUser, 
    loginUser, 
    updateShopImageController // Renamed for clarity in the next step
} = require("../Controllers/userController");

const auth = require("../Middleware/auth");
const upload = require("../Middleware/multer");
const route = require("express").Router();



route.get("/", getUser);
route.post("/register", addUser); // <-- More descriptive
route.post("/login", loginUser);
// Route for updating the user's shop image
route.put(
    "/update-shop-image", // <-- More descriptive path and using PUT
    auth, 
    upload.single('shopImage'), // <-- Consistent field name
    updateShopImageController
);
route.put("/:id", auth, updateUser);
route.delete("/:id", auth, deleteUser);



module.exports = route;
