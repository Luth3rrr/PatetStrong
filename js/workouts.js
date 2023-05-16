// credit to patet
const workoutsList = document.querySelector("#workouts-list");

// get workouts from local storage or set to empty array
let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

// render workouts list
workouts.forEach((workout, index) => {
  const workoutItem = document.createElement("li");
  workoutItem.innerHTML = `
  <div class="workout-container">
  <span class="workout-name">${workout.name}</span>
  <div class="exercises">
    ${workout.exercises
      .map(
        (exercise, exerciseIndex) => `
        <div class="exercise">
          <span class="exercise-name">${exercise.name}</span>
          <div class="exercise-details">
            <span>${exercise.sets} sets, ${exercise.reps} reps,  ${exercise.weight} weight</span>
            <button class="delete-exercise" data-workout="${index}" data-exercise="${exerciseIndex}">
  
            <div class="sign">X</div>
            
            <div class="d-text">Delete</div>
          </button>          </div>
        </div>
      `
      )
      .join("")}
  </div>
  <div class="start-delete-buttons">
  <button onclick="location.href='start-workout.html?workout=${index}'" class="start-workout-link"><span>Start Workout</span></button>
  <button class="edit-btn">Edit 
  <svg class="edit-svg" viewBox="0 0 512 512">
    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg>
</button>
  <button class="delete-workout" data-index="${index}"><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
</div>
</div>

  `;
  workoutsList.appendChild(workoutItem);
});

// add event listener for delete buttons
const deleteButtons = document.querySelectorAll(".delete-workout");
deleteButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    workouts.splice(index, 1);
    localStorage.setItem("workouts", JSON.stringify(workouts));
    location.reload();
  });
});
const deleteExerciseButtons = document.querySelectorAll(".delete-exercise");
deleteExerciseButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const workoutIndex = e.target.dataset.workout;
    const exerciseIndex = e.target.dataset.exercise;

    if (
      workouts[workoutIndex] &&
      workouts[workoutIndex].exercises[exerciseIndex]
    ) {
      workouts[workoutIndex].exercises.splice(exerciseIndex, 1);

      // Check if all exercises are deleted
      if (workouts[workoutIndex].exercises.length === 0) {
        workouts.splice(workoutIndex, 1);
      }

      localStorage.setItem("workouts", JSON.stringify(workouts));
      location.reload();
    }
  });
});
