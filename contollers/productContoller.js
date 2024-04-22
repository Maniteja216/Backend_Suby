const Product = require('../models/Product')
const multer = require('multer')
const Firm = require('../models/Firm')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'uploads/')
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+ Path.extname(file.originalname))
    }
})
const upload = multer({storage:storage})

const addProduct = async(req,res)=>{
    try {
        const {ProductName,Price,Category,BestSellar,Description} = req.body
        const image = req.file? req.file.filename:undefined

        const firmId = req.params.firmId
        const firm = await Firm.findById(firmId)
        if(!firm){
            res.status(400).json({error:"no fiem found"})
        }
        const product = new Product({
            ProductName,Price,Category,image,BestSellar,Description,form:firm._id

        })
        const savedProduct = await product.save()
        firm.products.push(savedProduct)
        await firm.save()
        res.status(200).json(savedProduct)

    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error in product control"})
        
    }
}

const getProductByFirm=async(req,res)=>{
    try {
        const firmId = req.params.firmId
        const firm = await Firm.findById(firmId)
        if(!firm){
            res.status(400).json({message:"firm id not found"})
        }
        const restarentName = firm.firstname
        const products = await Product.find({firm:firmId})
        res.status(200).json({restarentName,products})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"internal server error in get product by firm id"})
        
    }

}

const deleteProductById = async(req,res)=>{
    try {
        const productId = req.params.productId
        const deleteProduct = await Product.findByIdAndDelete(productId)
        if(!deleteProduct){
            return res.status(400).json({error:"product not found"})
        }
        res.status(200).json({message:"Product sucessfuly ddeleted"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"internal server error delete product by id"})
        
    }
}

module.exports = {addProduct:[upload.single('Image'),addProduct], getProductByFirm,deleteProductById}
        

    