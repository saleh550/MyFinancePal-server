const express=require('express')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")
const { addIncome } = require('../Controllers/incomeControllers')

router.post('/add/income',protect,addIncome)

module.exports=router