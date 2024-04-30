const Vendor = require('../models/Vendor')
const Firm = require('../models/Firm')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/')
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+ Path.extname(file.originalname))
    }
})
const upload = multer({storage:storage})

const addFirm = async(req,res)=>{
    try {
        const {firstname,area,category,region, offer} = req.body
        const image = req.file? req.file.filename:undefined

    
        const vendor = await Vendor.findById(req.vendorId)
        if(!vendor){
            res.status(400).json({message:"the vendorid inavalid"})
        }
        const firm = new Firm({
            firstname,area,category,region, offer,image,vendor:vendor._id
        })
        const savedFirm=await firm.save()
        vendor.firm.push(savedFirm)
        await vendor.save()
        return res.status(200).json({message:"firm addes succesfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal error")
    }
}

const deleteFirmtById = async(req,res)=>{
    try {
        const firmId = req.params.firmtId
        const deleteFirm = await Product.findByIdAndDelete(firmId)
        if(!deleteFirm){
            return res.status(400).json({error:"Firm not found"})
        }
        res.status(200).json({message:"Firm sucessfuly deleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error delete firm by id"})
        
    }
}

module.exports = {addFirm: [upload.single('image'),addFirm], deleteFirmtById}