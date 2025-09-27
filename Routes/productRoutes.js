const {
    getProduct, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    uploadImageController 
} = require("../Controllers/productController");

const auth = require("../Middleware/auth");
const upload = require("../Middleware/multer"); 
const route = require("express").Router();


route.get("/", getProduct);
route.post("/", auth, addProduct);
route.put("/:id", auth, updateProduct);
route.delete("/:id", auth, deleteProduct);


route.post("/upload-image", auth, upload.single('image'), uploadImageController);

module.exports = route;
