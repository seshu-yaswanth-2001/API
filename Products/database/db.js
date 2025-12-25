const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("Database connection success");
  } catch (err) {
    console.log("Database connection failed: ", err);
    process.exit(1);
  }
};

module.exports = connectToDB;
