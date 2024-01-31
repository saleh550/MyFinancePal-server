const express=require('express')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")
const { addExpense } = require('../Controllers/expenseController')

router.post('/add/expense',protect,addExpense)

module.exports=router