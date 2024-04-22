const express = require("express")
const firmController = require('../contollers/firmController')
const verifyToken = require('../middlewares/verifyToken')

const router= express.Router()

router.post('/add-firm',verifyToken,firmController.addFirm)

router.get('/uploads/:imageName',(req,res)=>{
    const imageName = req.params.imageName
    res.headersSent('content-type','image/jpg')
    res.sendFile(path.join(__dirname,'..',uploads,imageName))
})
router.delete('/:firmId',firmController.deleteFirmtById)

module.exports = router