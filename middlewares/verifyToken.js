const Vendor = require('../models/Vendor')
const jwt = require('jsonwebtoken')
const dotEnv = require('dotenv')

dotEnv.config()

const secratekey = process.env.theName

const verifyToken =async(req,res, next)=>{
    const token = req.headers.token
    if(!token){
        res.status(400).json({error:"Token is inavalid"})
    }
    try {
        const decoded =jwt.verify(token,secratekey)
        const vendor = await Vendor.findById(decoded.vendorId)
        if(!vendor){
            return res.status(404).json({error:"vendor not found"})
        }
        req.vendorId = vendor._id
        next()

    } catch (error) {
        console.log(error)
        return res.status(405).json({error:"tokens are notfound"})
    }
}

module.exports = verifyToken