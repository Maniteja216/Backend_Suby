const mongoose = require("mongoose")

const firmSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        unique:true
    },
    area:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
                type:String,
                enum:["Veg", "Nonveg"]
            }
        ]
    },
    region:{
        type:[
            {
                type:String,
                enum:["south-indian","north-indian","chines","Bakeray"]
            }
        ]
    },
    offer:{
        type:String
    },
    image:{
        type:String
    },
    venodr:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Vendor"
        }
    ],
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'product'
    }]
})

const Firm = mongoose.model('Firm', firmSchema)
module.exports = Firm