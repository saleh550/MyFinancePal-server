const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../Models/usersModel");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//@desc register a new user
//@route POST /api/users
//@access public
const registrUser = asyncHandler(async (req, res) => {
  const { fullName, userName, password, comfortPassword ,salary } = req.body;

  if (password !== comfortPassword) {
    res.status(500);
    throw new Error("You must to include a same passwords");
  }

  try {
    const userExist = await User.findOne({ userName });
    //check if the user is exists by email
    if (userExist) {
      res.status(400);
      throw new Error("Email already exist!");
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //Create user
    const user = await User.create({
      fullName,
      userName,
      salary,
      password: hashPassword,
    });
    if (user) {
      res.status(201);
      res.json({
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        salary:user.salary,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//@desc login with existing user
//@route POST /api/users/login
//@access publice
const loginUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });
    if (!user) {
      res.status(401);
      throw new Error("משתמש לא קיים");
    }
    if (await bcrypt.compare(password, user.password)) {
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        isAdmin: user.isAdmin,
        userName: user.userName,
        salary:user.salary,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("סיסמה לא חוקית");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

//@desc get a current user
//@route GET /api/users/me
//@access private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  registrUser,
  loginUser,
  getMe,
};
