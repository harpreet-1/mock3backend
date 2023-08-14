const mongoose = require("mongoose");
require("dotenv").config();
const dbConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://harpreetllg:harpreetllg@cluster0.4gj2jam.mongodb.net/mock3?retryWrites=true&w=majority"
    );
    console.log("db connected");
  } catch (error) {
    console.log("error in db connecion");
  }
};

module.exports = dbConnection;
