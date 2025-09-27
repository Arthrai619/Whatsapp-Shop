const express = require("express")
const mongoose = require("mongoose")
const userRoutes = require("./Routes/userRoutes")
const productRoutes = require("./Routes/productRoutes")
const categoryRoutes = require("./Routes/categoryRoutes")
require("dotenv/config")

const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Home")
})

app.use("/api/product",productRoutes)
app.use("/api/user",userRoutes)
app.use("/api/category",categoryRoutes)

app.listen(process.env.PORT)

async function DB() {
    try {
      const res = await mongoose.connect(process.env.DB)  
      console.log(res.default.STATES.connected)
    } catch (error) {
        console.log(error.message)
    }
}

DB()

