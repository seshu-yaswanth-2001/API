require("dotenv").config();

const express = require("express");
const connectToDB = require("./database/db");
const productRoutes = require("./routes/router");

const app = express();
const PORT = process.env.PORT || 3000;

connectToDB().catch((err) => {
  console.log("Database connection failed!");
  process.exit(1);
});

app.use(express.json());
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Port is now started ${PORT}`);
});
