const express = require("express");
const UserModel = require("../Models/user");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
let jwt = require("jsonwebtoken");

require("dotenv").config();

userRouter.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();

    return res.status(200).json({
      status: "success",
      users,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", error: "internal server error" });
  }
});
userRouter.post("/register", async (req, res) => {
  try {
    let { email, name, password } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ status: "error", error: "please fill all details" });
    }

    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({ status: "error", error: "user alredy exist" });
    }

    let hashed = await bcrypt.hash(password, 4);
    password = hashed;
    const user = await UserModel.create({ email, name, password });

    return res.status(201).json({
      status: "success",
      message: "user register successfull",
      user: { name, email },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", error: "internal server error" });
  }
});
userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "error", error: "please provide all credential" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ status: "error", error: "user not exist" });
    }

    let hashedResult = bcrypt.compare(user.password, password);

    if (hashedResult) {
      let token = jwt.sign({ email, userId: user._id }, process.env.JWT_SERCET);
      return res.status(201).json({
        status: "success",
        message: "user login successfull",
        user: { name: user.name, id: user._id, email },
        token,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", error: "internal server error" });
  }
});

module.exports = userRouter;
