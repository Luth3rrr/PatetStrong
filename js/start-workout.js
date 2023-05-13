// credit to patet
const urlParams = new URLSearchParams(window.location.search);
const workoutIndex = urlParams.get("workout");
const workouts = JSON.parse(localStorage.getItem("workouts")) || [];
let currentWorkout = workouts[workoutIndex] || {};

const workoutNameElement = document.querySelector("#workout-name");
const exercisesListElement = document.querySelector("#exercises-list");
const timerElement = document.querySelector("#timer");
const finishButton = document.querySelector("#finish-button");

let timerInterval;
let startTime;
let elapsedTime = 0;

const renderTimer = () => {
  const seconds = Math.floor(elapsedTime / 1000) % 60;
  const minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
  const hours = Math.floor(elapsedTime / 1000 / 60 / 60);

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  timerElement.textContent = formattedTime;
};

const startTimer = () => {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    renderTimer();
  }, 1000);
};

const finishWorkout = () => {
  clearInterval(timerInterval);

  const updatedExercises = Array.from(
    document.querySelectorAll(".exercise-item")
  ).map((exerciseItem) => {
    const exerciseName =
      exerciseItem.querySelector(".exercise-name").textContent;
    const setsInput = exerciseItem.querySelector(".sets-input");
    const repsInput = exerciseItem.querySelector(".reps-input");
    const weightInput = exerciseItem.querySelector(".weight-input");

    const sets = parseInt(setsInput.value, 10) || 0;
    const reps = parseInt(repsInput.value, 10) || 0;
    const weight = parseInt(weightInput.value, 10) || 0;

    return {
      name: exerciseName,
      sets,
      reps,
      weight,
    };
  });

  currentWorkout = {
    ...currentWorkout,
    exercises: updatedExercises,
    completedAt: new Date().toISOString(),
  };

  workouts[workoutIndex] = currentWorkout;
  localStorage.setItem("workouts", JSON.stringify(workouts));

  // Calculate training session duration
  const endTime = Date.now();
  const trainingDuration = Math.floor((endTime - startTime) / 1000); // in seconds

  // Find previous workout for comparison
  const previousWorkoutIndex = workoutIndex - 1;
  const previousWorkout = workouts[previousWorkoutIndex];

  // Prepare training information for the pop-up window
  const trainingInfo = {
    duration: trainingDuration,
    exercises: updatedExercises,
    previousWorkout,
  };

  // Open pop-up window with training information
  const trainingInfoWindow = window.open("", "_blank", "width=600,height=400");
  trainingInfoWindow.document.write(`
      <html>
      <head>
      <title>Training Information</title>
      <style>
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
      }
  
      h1 {
        margin-bottom: 20px;
      }
  
      h2 {
        margin-top: 30px;
      }
  
      ul {
        list-style-type: none;
        padding-left: 0;
      }
  
      li {
        margin-bottom: 10px;
      }
      </style>
      </head>
      <body>
      <h1>Training Information</h1>
      <p>Duration: ${formatDuration(trainingDuration)}</p>
      <h2>Exercises:</h2>
      <ul>
        ${updatedExercises
          .map(
            (exercise) =>
              `<li>${exercise.name} - Sets: ${exercise.sets}, Reps: ${exercise.reps}, Weight: ${exercise.weight} lbs</li>`
          )
          .join("")}
      </ul>
      ${
        previousWorkout
          ? `<h2>Comparison with Previous Workout:</h2>
      <ul>
        ${updatedExercises
          .map((exercise) => {
            const previousExercise = previousWorkout.exercises.find(
              (prevExercise) => prevExercise.name === exercise.name
            );
            if (previousExercise && exercise.weight > previousExercise.weight) {
              const weightDifference =
                exercise.weight - previousExercise.weight;
              return `<li>${exercise.name} - You lifted ${weightDifference} lbs more than the previous workout</li>`;
            }
            return "";
          })
          .join("")}
      </ul>`
          : ""
      }
      </body>
      </html>
    `);
  window.location.href = "index.html";
};

// Utility function to format duration in HH:MM:SS format
const formatDuration = (duration) => {
  const seconds = duration % 60;
  const minutes = Math.floor((duration / 60) % 60);
  const hours = Math.floor(duration / 3600);

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return formattedTime;
};

// Rest of the code remains the same

// Render workout details
workoutNameElement.textContent = currentWorkout.name;

currentWorkout.exercises.forEach((exercise) => {
  const exerciseItem = document.createElement("div");
  exerciseItem.classList.add("exercise-item");
  exerciseItem.innerHTML = `
      <div class="exercise-name">${exercise.name}</div>
      <div>
        <label for="sets-${exercise.name}">Sets:</label>
        <input id="sets-${exercise.name}" class="sets-input" type="number" min="0" value="${exercise.sets}" />
      </div>
      <div>
      <label for="reps-${exercise.name}">Reps:</label>
      <input id="reps-${exercise.name}" class="reps-input" type="number" min="0" value="${exercise.reps}" />
      </div>
      <div>
      <label for="weight-${exercise.name}">Weight:</label>
      <input id="weight-${exercise.name}" class="weight-input" type="number" min="0" value="${exercise.weight}" />
      </div>
      </div>`;
  exercisesListElement.appendChild(exerciseItem);
});

finishButton.addEventListener("click", () => {
  finishWorkout();
});

// Start the timer when the page loads
startTimer();
// credit to patet