const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});

    if (allUsers.length > 0) {
      res.status(200).json({
        success: true,
        message: "Users fetched",
        users: allUsers,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No Users registered!",
      });
    }
  } catch (err) {
    console.log(Err);
    res.status(500).json({
      success: false,
      message: "Someting went wrong!",
    });
  }
};

const registerUsers = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    // check if userName already exists
    const checkUser = await User.findOne({ $or: [{ userName }, { email }] });

    if (checkUser) {
      res.status(400).json({
        success: false,
        message: "User already exists!",
      });
    }

    // Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      email,
      password: hashPassword,
      role: role || "user",
    });

    await newUser.save();

    if (newUser) {
      res.status(200).json({
        success: true,
        message: "User created!",
        user: newUser,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Something went wrong!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went Wrong!",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // verify the email exist in the db or not
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Email not found!",
      });
    }

    // verify password

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      res.status(400).json({
        success: false,
        message: "Password Incorrect!",
      });
    }

    // generate a token

    const accessToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login Successful",
      accessToken: accessToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

module.exports = { getAllUsers, registerUsers, loginUser };
