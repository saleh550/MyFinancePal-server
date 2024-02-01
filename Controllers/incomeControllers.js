const asyncHandler = require("express-async-handler");
const User = require("../Models/usersModel");
const Income =require("../Models/incomesModel")
//@desc add new income for a specific user by id 
//@route POST /api/incomes/add/income
//@access public
const addIncome = asyncHandler(async (req, res) => {
    const { name, category, date, amount } = req.body;
    const user = req.user;
    try {
      const newIncome = await Income.create({
        userID: user._id,
        name,
        category,
        date,
        amount,
      });
      res.json(newIncome)
    } catch (error) {
      res.status(500);
      throw new Error(error);
    }
  

  });
//@desc get incomes categries summary and incomes  for the graph
//@route GET /api/incomes/get/incomes/data
//@access private
const getIncomesData = asyncHandler(async (req, res) => {
  const user = req.user;

  try {
    const categories = await Income.aggregate([
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
    let incomes = await Income.aggregate([
      {
        $match: { userID: user._id },
      },
      {
        $group:{
          _id:{name:"$name", category: "$category"},
          value:{$sum:"$amount"},
          date: { $last: "$date" }
        }
      },
      {
        $project:{
          _id:0,
          name:"$_id.name",
          category:"$_id.category",
          value:1,
          date:1
        }
      }
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
incomes.sort(customComparator);
    res.json({incomes,categories});
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});
  module.exports = {
    addIncome,
    getIncomesData
  };