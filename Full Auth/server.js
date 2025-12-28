require("dotenv").config();

const express = require("express");
const connectToDB = require("./database/db");
const app = express();
const authRouter = require("./routers/authentication-routes");
const homeRouter = require("./routers/home-routes");
const adminRouter = require("./routers/admin-routes");

const PORT = process.env.PORT || 3000;

connectToDB().catch((err) => {
  console.log("Database connection failed!", err);
  process.exit(1);
});

// middleware
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/home", homeRouter);
app.use("/api/admin", adminRouter);

app.listen(PORT, () => {
  console.log("Server is started at port: ", PORT);
});
