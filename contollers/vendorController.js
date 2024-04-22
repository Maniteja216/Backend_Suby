const Vendor = require('../models/Vendor')
const jwt= require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const dotEnv = require("dotenv")

dotEnv.config()
const secretkey =process.env.theName

const vendorRegister =async(req,res)=>{
    const {username,email,password}= req.body
    try {
        const vendorEmail = await Vendor.findOne({email})
        if(vendorEmail){
            return res.status(400).json("Email already existed")
        }
        const hashedPasword = await bcrypt.hash(password,10)
        const newVendor = new Vendor({
            username,
            email,
            password:hashedPasword
        })
        await newVendor.save()
        res.status(201).json({message: "vendor register succesfully"})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "internal server error"})
        
    }
}


const vendorLogin=async(req,res)=>{
    const {email,password}= req.body
    
    try {
        const vendor =await Vendor.findOne({email})
        if(!vendor || !(await bcrypt.compare(password,vendor.password))){
            return res.status(401).json({error:"email or password invalid"})
        }
        const token = jwt.sign({vendorId:vendor._id}, secretkey,{expiresIn:"1h"})
        res.status(201).json({success:"success fully login",token})
        console.log(email,"thies is token",token)

    } catch (error) {
        console.log(error)
        return res.status(500).json("internal server error")
        
    }
}

const getAllVendors = async (req,res)=>{
    try {
        const vendors = await Vendor.find().populate('firm')
        res.json({vendors})
    } catch (error) {
        console.log(error)
        return res.status(500).json("internal server error in get all vendors")
        
    }
}

const getVendorById = async(req,res)=>{
    const vendorId = req.params.id
    try {
        const vendor = await Vendor.findById(vendorId).populate('firm')
        if(!vendor){
            res.status(404).json({error:"vendor by id error"})
        }
        res.status(200).json({vendor})
    } catch (error) {
        console.log(error)
        return res.status(500).json("internal server error in get vendor by id")
        
    }
}
module.exports = {vendorRegister, vendorLogin, getAllVendors, getVendorById}