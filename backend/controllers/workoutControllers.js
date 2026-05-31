const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// create a new workout
exports.createWorkout = async (req, res) => {
 
  const { title, reps, load } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  } if (!load) {
    emptyFields.push("load");
  }  if (!reps) {
    emptyFields.push("reps");
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "Please fill out all the fields!",
      emptyFields,
    });
  }

  try {
    const user_id = req.user._id
    const workout = await Workout.create({ title, reps, load,user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

//get all workouts
exports.getWorkouts = async (req, res) => {
   const user_id = req.user._id
  const workouts = await Workout.find({user_id}).sort({ createdAt: -1 });

  if (!workouts)
    return res.status(400).json({
      error: "no entries found",
    });

  res.status(200).json(workouts);
};

// get a single workout by its id

exports.getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no workouts" });
  }

  const workout = await Workout.findById(id);
  if (!workout)
    return res.status(404).json({
      error: "No such workouts",
    });

  res.status(200).json(workout);
};

// deleting a workout by its id

exports.deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "no workout found to delete" });

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({
      error: "no workout found to delete",
    });
  }

  res.status(200).json(workout);
};

// updating workout by its id
exports.updateWorkout = async (req, res) => {
  const { id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "no workout found to delete" });

  const workout = await Workout.findOneAndUpdate(
    {
      _id: id,
    },
    {
      ...req.body,
    },
    {
      new: true,
    },
  );

  if (!workout) {
    return res.status(404).json({ error: "no such workouts" });
  }
  res.status(200).json(workout);
};
