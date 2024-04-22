const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    ProductName:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    },
    Category:{
        type:[
            {
                type:String,
                enum:["Veg","Nonveg"]
            }
        ]
    },
    image:{
        type:String
    },
    BestSellar:{
        type:String

    },
    Description:{
        type:String
    },
    firm:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Firm'
    }]

})

const product = mongoose.model('product', productSchema)

module.exports = product