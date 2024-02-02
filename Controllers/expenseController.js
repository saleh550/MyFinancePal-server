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
    res.json(newExpense);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

//@desc get cexpenses categries summary and expenses  for the graph
//@route GET /api/expenses/get/expenses/data
//@access private
const getExpensesData = asyncHandler(async (req, res) => {
  const user = req.user;

  try {
    const categories = await Expense.aggregate([
      {
        $match: {
          userID: user._id,
        },
      },
      {
        $group: {
          _id: "$category",
          value: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          value: 1,
        },
      },
    ]);
    let expenses = await Expense.aggregate([
      {
        $match: { userID: user._id },
      },
      {
        $group: {
          _id: { name: "$name", category: "$category" },
          value: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id.name",
          category: "$_id.category",
          value: 1,
        },
      },
    ]);
    // Create a map to store the order of categories from array2
    const categoryOrderMap = new Map();
    categories.forEach((item, index) => {
      categoryOrderMap.set(item.name, index);
    });

    // Custom comparator function to sort array1 based on the order of categories in array2
    const customComparator = (a, b) => {
      const orderA = categoryOrderMap.get(a.category);
      const orderB = categoryOrderMap.get(b.category);

      return orderA - orderB;
    };
    expenses.sort(customComparator);
    res.json({ expenses, categories });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

//@desc get expenses by date
//@route GET /api/expenses/get/expenses/by/date
//@access private
const getExpensesByDate = asyncHandler(async (req, res) => {
  const user = req.user;
  try {
    const expensesByDate = await Expense.aggregate([
      { $match: { userID: user._id } },
      { $sort: { date: 1 } },
      {
        $project: {
          _id:0,
          name:1,
          amount:1,
          category:1,
          date:{
            $dateToString: {
              format: "%d/%m/%Y",
              date: "$date"
            }
          },
        },
      },
    ]);
    res.json(expensesByDate);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

module.exports = {
  addExpense,
  getExpensesData,
  getExpensesByDate,
};
