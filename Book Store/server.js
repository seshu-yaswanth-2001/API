require("dotenv").config();

const express = require("express");
const connectToDB = require("./Database/index");
const bookRoutes = require("./Routes/routes");

const app = express();
const PORT = process.env.PORT || 3000;

connectToDB().catch((err) => {
  console.error("Database connection error: ", err);
});

app.use(express.json());

app.use("/api/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Port is now running on ${PORT}`);
});
