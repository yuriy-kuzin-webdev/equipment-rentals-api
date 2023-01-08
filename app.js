const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB)
  .then(app.listen(PORT, console.log(`App started at port : ${PORT}`)))
  .catch((error) => console.log(error));
