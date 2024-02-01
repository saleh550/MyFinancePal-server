const express=require('express')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")
const { addExpense, getExpensesData } = require('../Controllers/expenseController')

router.post('/add/expense',protect,addExpense)
router.get('/get/expenses/data',protect,getExpensesData)

module.exports=router