const asyncHandler = require("express-async-handler");
const User = require("../Models/usersModel");
const Expense = require("../Models/expenseModel");

//@desc add new income for a specific user by id
//@route POST /api/incomes/add/income
//@access public
const addExpense = asyncHandler(async (req, res) => {
  const { name, category, date, amount } = req.body;
  const user = req.user;
  try {
    const newExpense = await Expense.create({
      userID: user._id,
      name,
      category,
      date,
      amount,
    });
    res.json(newExpense)
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

module.exports = {
  addExpense,
};
