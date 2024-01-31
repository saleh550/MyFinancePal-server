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

  module.exports = {
    addIncome,
  };