const express=require('express')
const router=express.Router()
const {protect}=require("../middleware/authMiddleware")
const { addExpense, getExpensesData, getExpensesByDate } = require('../Controllers/expenseController')

router.post('/add/expense',protect,addExpense)
router.get('/get/expenses/data',protect,getExpensesData)
router.get('/get/expenses/by/date',protect,getExpensesByDate)

module.exports=router