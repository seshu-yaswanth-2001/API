const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database Connected Successfully!");
  } catch (err) {
    console.log("Database connection failed", err);
    process.exit(1);
  }
};

module.exports = connectToDB;
