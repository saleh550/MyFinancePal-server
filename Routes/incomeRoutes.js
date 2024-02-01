const express=require('express')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")
const { addIncome, getIncomesData } = require('../Controllers/incomeControllers')

router.post('/add/income',protect,addIncome)
router.get('/get/incomes/data',protect,getIncomesData)


module.exports=router