const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        // 1. Get token from the standard Authorization header
        const authHeader = req.header("Authorization");

        // 2. Check if token exists and is in the correct "Bearer" format
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ 
                errors: true, 
                message: "Access denied. No token provided." 
            });
        }
        
        const token = authHeader.split(' ')[1];

        // 3. Verify the token
        const decodedPayload = jwt.verify(token, process.env.SEC);

        // 4. Attach the user payload to the request object (THE FIX)
        req.user = decodedPayload;
        
        next(); // Pass control to the next function

    } catch (error) {
        // This will catch any error from jwt.verify (invalid, expired, etc.)
        return res.status(401).json({ 
            errors: true, 
            message: "Invalid or expired token." 
        });
    }
};

module.exports = auth;
