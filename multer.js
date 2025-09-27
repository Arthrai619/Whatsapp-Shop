const multer = require('multer');

const storage = multer.memoryStorage();

// This function will check if the uploaded file is an image
const fileFilter = (req, file, cb) => {
    // Check the mimetype of the file
    if (file.mimetype.startsWith('image')) {
        cb(null, true); // Accept the file
    } else {
        // Reject the file
        cb(new Error('Only image files are allowed!'), false); 
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB file size limit
    },
    fileFilter: fileFilter // <-- Add the file filter here
});

module.exports = upload;