const express = require("express");
const FlightModel = require("../Models/FlightModel");

const flightRouter = express.Router();
// get all flights***************************
flightRouter.get("/", async (req, res) => {
  try {
    const flights = await FlightModel.find();

    return res.status(200).json({
      status: "success",
      flights,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", error: "internal server error" });
  }
});
// get  flight by id ***************************

flightRouter.get("/:id", async (req, res) => {
  try {
    const flight = await FlightModel.findById(req.params.id);
    return res.status(200).json({
      status: "success",
      flight,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", error: "internal server error" });
  }
});
// add new flight********************

flightRouter.post("/", async (req, res) => {
  try {
    let {
      airline,
      flightNo,
      departure,
      arrival,
      departureTime,
      arrivalTime,
      seats,
      price,
    } = req.body;
    if (
      !airline ||
      !flightNo ||
      !departure ||
      !arrival ||
      !departureTime ||
      !arrivalTime ||
      !seats ||
      !price
    ) {
      return res
        .status(400)
        .json({ status: "error", error: "please fill all details" });
    }

    const flight = await FlightModel.create({
      airline,
      flightNo,
      departure,
      arrival,
      departureTime,
      arrivalTime,
      seats,
      price,
    });

    return res.status(201).json({
      status: "success",
      message: "new flight added",
      flight,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", error: "internal server error" });
  }
});

// update flight by id**************
flightRouter.patch("/:id", async (req, res) => {
  try {
    const flights = await FlightModel.findOneAndUpdate(
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
// delete flight by id**************

flightRouter.delete("/:id", async (req, res) => {
  try {
    const flights = await FlightModel.findOneAndDelete({ _id: req.params.id });
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
module.exports = flightRouter;
