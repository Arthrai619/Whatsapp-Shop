const jwt = require("jsonwebtoken")

async function auth(req,res,next) {
    try {
        const token = req.header("auth-token")
        const verifyToken = await jwt.verify(token,process.env.SEC)
        if(!verifyToken) return res.json({errors:true ,message:"Token is Invalid"})
        next()

    }

     catch (error) {
        return res.status(500).json({errors:true,message:error.message})
    }

}

module.exports  = auth