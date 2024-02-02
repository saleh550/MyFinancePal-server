const express=require('express')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")
const { addIncome, getIncomesData,getIncomesByDate } = require('../Controllers/incomeControllers')

router.post('/add/income',protect,addIncome)
router.get('/get/incomes/data',protect,getIncomesData)
router.get('/get/incomes/by/date',protect,getIncomesByDate)



module.exports=router