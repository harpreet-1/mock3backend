const express = require("express");
const BookingModel = require("../Models/BookingModel");

const bookingRouter = express.Router();

// add new booking********************

bookingRouter.post("/", async (req, res) => {
  try {
    let { user, flight } = req.body;
    if (!user || !flight) {
      return res
        .status(400)
        .json({ status: "error", error: "please fill all details" });
    }

    const booking = await BookingModel.create({ user, flight });

    return res.status(201).json({
      status: "success",
      message: " booking successfull",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", error: "internal server error" });
  }
});

module.exports = bookingRouter;
