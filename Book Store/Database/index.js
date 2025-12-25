require("dotenv").config();
const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("Database connection Success!");
  } catch (err) {
    console.log("Error: ", err);
    process.exit(1);
  }
};

module.exports = connectToDB;
