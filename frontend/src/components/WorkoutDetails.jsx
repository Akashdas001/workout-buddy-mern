import React from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";


// data fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const {user} =useAuthContext()

  const handleClick = async () => {

    if(!user){
      return
    }
    const response = await fetch(
      "https://workout-buddy-mern-cdop.onrender.com/api/workouts" + workout._id,
      {
        method: "DELETE",
        headers :{
          'authorization' :`Bearer ${user.token}`
        }
      },
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUTS", payload: json });
    }
  };
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (in kgs):</strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps:</strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), {
          addSuffix: true,
        })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
