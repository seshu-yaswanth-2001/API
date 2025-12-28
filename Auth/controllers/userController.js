const User = require("../models/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    if (allUsers.length > 0) {
      res.status(200).json({
        success: true,
        message: "Users fetched",
        data: allUsers,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong!",
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    const checkExistingUser = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newlyCreatedUser = new User({
      userName,
      email,
      password: hashPassword,
      role: role || "user",
    });

    await newlyCreatedUser.save();

    if (newlyCreatedUser) {
      res.status(201).json({
        success: true,
        message: "User Created Success",
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
      message: "Something went wrong!",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if the userName exists or not
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "user does not exist!",
      });
    }

    // check the password and compare with the got new password

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(400).json({
        success: false,
        message: "Password doesn't match",
      });
    }

    // create token
    const accessToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({
      success: true,
      message: "Logged in Successful",
      accessToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User Id not found to delete!",
      });
    }

    res.status(201).json({
      success: true,
      message: "User deleted!",
      data: deletedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong!",
    });
  }
};

module.exports = { getAllUsers, registerUser, loginUser, deleteUser };
