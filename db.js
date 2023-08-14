const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("db connected");
  } catch (error) {
    console.log("error in db connecion");
  }
};

module.exports = dbConnection;
