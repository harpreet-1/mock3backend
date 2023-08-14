const express = require("express");
const cors = require("cors");
const dbConnection = require("./db");
const userRouter = require("./Routes/user.routes");
const flightRouter = require("./Routes/flight.routes");
const bookingRouter = require("./Routes/booking.routes");
const dashboardRouter = require("./Routes/dashboard.routes");

const app = express();

app.use(express.json());
app.use(cors());
// login register route for user
app.use("/api", userRouter);

// route for add fligt , update , delete
app.use("/api/flights", flightRouter);

// route for book fligt
app.use("/api/booking", bookingRouter);

// route for get  booking details , update , delete
app.use("/api/dashboard", dashboardRouter);

// server home
app.get("/", function (req, res) {
  res.send("Hello from serve");
});

app.listen(3000, () => {
  dbConnection();
  console.log("Server started at 3000");
});
