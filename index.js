const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const vendorRoutes = require('./routes/vendorRouter')
const firmRoutes = require('./routes/firmRoutes')
const productRoutes= require('./routes/productRouter')
const cors = require('cors')
const path = require('path')


const app = express()

PORT = process.env.PORT || 4000

dotenv.config()
app.use(cors())
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("connected sucess fully"))
    .catch((error)=>console.log(error))
app.use(bodyParser.json())
app.use('/vendor', vendorRoutes)
app.use('/firm',firmRoutes)
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'))

app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})
/*
app.use('/',(req,res)=>{
    res.send("welcome")
})*/