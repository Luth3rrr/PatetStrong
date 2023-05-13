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
          <div>
            <span>${exercise.name}</span>
            <button class="delete-exercise" data-workout="${index}" data-exercise="${exerciseIndex}">Delete</button>
          </div>
        `
        )
        .join("")}
      </div>
      <div class="reps-sets">
        ${workout.exercises
          .map(
            (exercise) =>
              `<div>${exercise.sets} sets, ${exercise.reps} reps</div>`
          )
          .join("")}
      </div>
    
      <a class="start-workout-link" href="start-workout.html?workout=${index}">Start Workout</a>
      <button class="delete-workout" data-index="${index}">Delete</button>
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
    workouts[workoutIndex].exercises.splice(exerciseIndex, 1);

    // Check if all exercises are deleted
    if (workouts[workoutIndex].exercises.length === 0) {
      workouts.splice(workoutIndex, 1);
    }

    localStorage.setItem("workouts", JSON.stringify(workouts));
    location.reload();
  });
});
