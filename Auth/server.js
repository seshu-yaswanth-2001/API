require("dotenv").config();

const express = require("express");
const connectToDB = require("./database/db");
const userRoutes = require("./routes/auth-routes");
const homeRoutes = require("./routes/home-routes");
const adminRouter = require("./routes/admin-routes");

const app = express();
const PORT = process.env.PORT || 3000;

connectToDB().catch((err) => {
  console.log("Database Connection Failed!");
  process.exit(1);
});

app.use(express.json());
app.use("/api/auth/", userRoutes);
app.use("/api/home/", homeRoutes);
app.use("/api/admin/", adminRouter);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}.`);
});
