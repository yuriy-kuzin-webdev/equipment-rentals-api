const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

mongoose
  .connect(process.env.MONGODB)
  .then(app.listen(PORT, console.log(`App started at port : ${PORT}`)))
  .catch((error) => console.log(error));
