const express = require("express");
const BookingModel = require("../Models/BookingModel");

const dashboardRouter = express.Router();
// get booking data************
dashboardRouter.get("/", async (req, res) => {
  try {
    const bookings = await BookingModel.find()
      .populate("user")
      .populate("flight");

    return res.status(200).json({
      status: "success",
      bookings,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", error: "internal server error" });
  }
});

// update booking by id**************
dashboardRouter.patch("/:id", async (req, res) => {
  try {
    const flights = await BookingModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    return res.status(204).json({
      status: "success",
      message: " flight updated",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", error: "internal server error" });
  }
});
// delete booking by id**************

dashboardRouter.delete("/:id", async (req, res) => {
  try {
    const flights = await BookingModel.findOneAndDelete({ _id: req.params.id });
    return res.status(202).json({
      status: "success",
      message: " flight deleted",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", error: "internal server error" });
  }
});
module.exports = dashboardRouter;
