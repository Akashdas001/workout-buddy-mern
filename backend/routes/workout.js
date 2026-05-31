const express = require("express");
const Workout = require("../models/workoutModel");

const {
  createWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutControllers");

const requireAuth= require("../middleware/requireAuth")

const router = express.Router();

router.use(requireAuth)

/**
 * route : /api/woksouts
 * method: GET
 * Description :Get all workouts
 * Access : public
 * parameter :None
 */

router.get("/", getWorkouts);

/**
 * route : /api/workouts/:id
 * method: GET
 * Description :Get a single workout by its id
 * Access : public
 * parameter :None
 */

router.get("/:id", getWorkout);

/**
 * route : /api/workouts/:id
 * method: DELETE
 * Description :Deletes a single workout
 * Access : public
 * parameter :None
 */

router.delete("/:id", deleteWorkout);

/**
 * route :/api/woksouts/:id
 * method: PATCH
 * Description :Updates a single workout
 * Access : public
 * parameter :None
 */

router.patch("/:id", updateWorkout);

/**
 * route : /api/woksouts
 * method: POST
 * Description :Create /add a new Workout
 * Access : public
 * parameter :None
 */

router.post("/", createWorkout);

module.exports = router;
