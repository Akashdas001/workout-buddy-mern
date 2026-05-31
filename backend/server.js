// importing express package
const express = require("express");

const cors = require("cors");

// importing env dile
const dotenv = require("dotenv");

//importing workout.js
const workoutRoutes = require("./routes/workout");
// importing userroutes
const userRoutes = require("./routes/User");

// import mongoose
const mongoose = require("mongoose");

// config our env file
dotenv.config();

// express app
const app = express();

// create port number
// initilize our port number using env file
// const PORT = process.env.PORT;
const PORT = process.env.PORT || 4000;

//middleware
app.use(cors());
// app.use(express.json());
// app.use((req, res, next) => {
//   (console.log(req.path, req.method),
//    next());
// });
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
//routes
app.get("/", (req, res) => {
  res.json({
    message: "home page",
  });
});

//use the workoutRoutes
app.use("/api/workouts/", workoutRoutes);
app.use("/api/user/", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT,'0.0.0.0', () => {
      console.log(`DB Connected`);
      console.log(`server is running on port: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
