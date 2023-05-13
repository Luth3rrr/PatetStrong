// credit to patet
const exerciseForm = document.querySelector("#exercise-form");
const exerciseSearch = document.querySelector("#exercise-search");
const exerciseSuggestions = document.querySelector("#exercise-suggestions");
const selectedExercisesContainer = document.querySelector(
  "#selected-exercises"
);
const exercisesCheckboxes = document.querySelectorAll(".exercise-checkbox");

exerciseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const workoutName = document.querySelector("#workout-name").value;
  const selectedExercises = Array.from(selectedExercisesContainer.children).map(
    (exerciseElement) => {
      const exerciseName = exerciseElement.textContent;
      const setsInput = exerciseElement.querySelector(".weight-input");
      const weightInput = exerciseElement.querySelector(".sets-input");
      const repsInput = exerciseElement.querySelector(".reps-input");
      const sets = setsInput.value || 0;
      const weight = weightInput.value || 0;
      const reps = repsInput.value || 0;
      return { name: exerciseName, sets, reps, weight };
    }
  );

  if (workoutName && selectedExercises.length > 0) {
    const workout = {
      name: workoutName,
      exercises: selectedExercises,
    };

    // get current workouts from local storage or set to an empty array
    let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

    // add new workout to workouts array
    workouts.push(workout);

    // store updated workouts array in local storage
    localStorage.setItem("workouts", JSON.stringify(workouts));

    // redirect to workouts page
    window.location.href = "workouts.html";
  } else {
    // show an error message to the user
    alert("Please enter a workout name and select at least one exercise.");
  }
});

exerciseSearch.addEventListener("input", (e) => {
  const searchQuery = e.target.value.trim();
  const suggestions = getExerciseSuggestions(searchQuery);
  displayExerciseSuggestions(suggestions);
});

exerciseSuggestions.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const exerciseName = e.target.textContent;
    addSelectedExercise(exerciseName);
  }
});

selectedExercisesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    const exerciseElement = e.target.parentNode;
    exerciseElement.parentNode.removeChild(exerciseElement);
  }
});

function getExerciseSuggestions(searchQuery) {
  // Replace this with your own logic to fetch exercise suggestions based on the search query
  // For demonstration purposes, let's assume we have a hardcoded list of exercise suggestions
  const hardcodedSuggestions = [
    "Bench Press",
    "Squat",
    "Deadlift",
    "Pull-ups",
    "Push-ups",
    "Barbell Rows",
    "Shoulder Press",
    "Lunges",
    "Dumbbell Curls",
    "Tricep Dips",
    "Plank",
    "Russian Twists",
    "Leg Press",
    "Calf Raises",
    "Lat Pulldowns",
    "Dumbbell Flyes",
    "Hamstring Curls",
    "Incline Bench Press",
    "Front Squats",
    "Chest Press",
    "Overhead Tricep Extension",
    "Step-ups",
    "Seated Cable Rows",
    "Arnold Press",
    "Lateral Raises",
    "Glute Bridges",
    "Bicep Hammer Curls",
    "Skull Crushers",
    "Mountain Climbers",
    "Barbell Squats",
    "Dumbbell Lunges",
    "Romanian Deadlifts",
    "Bent-Over Rows",
    "Incline Dumbbell Press",
    "Cable Pull-downs",
    "Dumbbell Shoulder Press",
    "Barbell Bicep Curls",
    "Tricep Pushdowns",
    "Russian Twists",
    "Leg Press",
    "Seated Calf Raises",
    "Lat Pulldowns",
    "Dumbbell Chest Flyes",
    "Leg Extensions",
    "Barbell Bench Press",
    "Sumo Deadlifts",
    "Wide Grip Pull-ups",
    "Dips",
    "Plank",
    "Crunches",
    "Hamstring Curls",
    "Front Squats",
    "Chest Dips",
    "Military Press",
    "Lateral Raises",
    "Hip Thrusts",
    "Preacher Curls",
    "Skull Crushers",
    "Burpees",
    "Barbell Lunges",
    "Incline Bench Dumbbell Press",
    "Cable Rows",
    "Arnold Dumbbell Press",
    "Front Raises",
    "Stiff-Legged Deadlifts",
    "Wide Grip Lat Pulldowns",
    "Dumbbell Pullovers",
    "Reverse Lunges",
    "Hammer Curls",
    "Close Grip Bench Press",
    "Hanging Leg Raises",
    "Step-ups with Knee Raise",
    "Seated Dumbbell Press",
    "Reverse Flyes",
    "Cable Kickbacks",
    "Sled Push",
    "Smith Machine Squats",
    "Dumbbell Bench Press",
    "Sumo Squats",
    "Renegade Rows",
    "Plank Jacks",
    "Superman",
    "Leg Curls",
    "Barbell Hip Thrusts",
    "Concentration Curls",
    "Tricep Overhead Dumbbell Extension",
    "Jump Squats",
    "High Pulls",
    "Reverse Crunches",
    "Walking Lunges",
    "Bulgarian Split Squats",
    "Cable Crossovers",
    "Seated Leg Curls",
    "Dumbbell Hammer Curls",
    "Tricep Skull Crushers",
    "Side Plank",
    "Russian Twists with Medicine Ball",
    "Leg Press Calf Raises",
    "Wide Grip Seated Cable Rows",
    "Decline Bench Press",
    "Roman Chair Leg Raises",
    "Standing Calf Raises",
    "T-Bar Rows",
    "Side Lateral Raises",
    "Donkey Kicks",
    "Spider Curls",
    "Tricep Bench Dips",
    "Box Jumps",
    "Front Plate Raises",
    "Oblique Crunches",
    "Hack Squats",
    "Lying Leg Curls",
    "Hammer Strength Rows",
    "Alternating Dumbbell Curls",
    "Dumbbell Tricep Kickbacks",
    "Medicine Ball Slams",
    "Smith Machine Lunges",
    "Reverse Grip Lat Pulldowns",
    "Decline Sit-ups",
    "Seated Calf Raises",
    "Pec Deck Flyes",
    "Weighted Russian Twists",
    "Leg Press Machine",
    "Machine Shoulder Press",
    "Good Mornings",
    "Close Grip Cable Pulldowns",
    "Dumbbell Flyes",
    "Overhead Cable Tricep Extension",
    "Box Step-ups",
    "Bent-Over Reverse Flyes",
    "Seated Leg Press",
    "EZ Bar Curls",
    "Tricep Cable Pushdowns",
    "Mountain Climber Twists",
    "Hack Squats",
    "Roman Chair Back Extensions",
    "Donkey Calf Raises",
    "Cable Lat Pulldowns",
    "Dumbbell Incline Flyes",
    "Hamstring Ball Curls",
    "Decline Push-ups",
    "Arnold Dumbbell Curls",
    "Overhead Tricep Dumbbell Press",
    "Jumping Lunges",
    "Resistance Band Bicep Curls",
    "Bent-Over Dumbbell Rows",
    "Seated Overhead Dumbbell Press",
    "Lateral Lunge",
    "Single Leg Glute Bridge",
    "Preacher Hammer Curls",
    "Tricep Cable Kickbacks",
    "Medicine Ball Mountain Climbers",
    "Hack Squats",
    "Front Squats with Dumbbells",
    "Seated Calf Raises",
    "Cable Crossovers",
    "Weighted Russian Twists",
  ];

  return hardcodedSuggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  );
}

function displayExerciseSuggestions(suggestions) {
  if (exerciseSearch.value.trim() === "") {
    exerciseSuggestions.innerHTML = "";
    return;
  }

  exerciseSuggestions.innerHTML = "";
  suggestions.forEach((suggestion) => {
    const suggestionElement = document.createElement("li");
    suggestionElement.textContent = suggestion;
    exerciseSuggestions.appendChild(suggestionElement);
  });
}

function addSelectedExercise(exerciseName) {
  const exerciseElement = document.createElement("li");
  const exerciseNameElement = document.createElement("span");
  exerciseNameElement.textContent = exerciseName;
  exerciseElement.appendChild(exerciseNameElement);

  const repsInput = document.createElement("input");
  repsInput.type = "number";
  repsInput.classList.add("reps-input");
  repsInput.placeholder = "Reps";
  exerciseElement.appendChild(repsInput);

  const setsInput = document.createElement("input");
  setsInput.type = "number";
  setsInput.classList.add("sets-input");
  setsInput.placeholder = "Sets";
  exerciseElement.appendChild(setsInput);

  const weightInput = document.createElement("input");
  weightInput.type = "number";
  weightInput.classList.add("weight-input");
  weightInput.placeholder = "Weight";
  exerciseElement.appendChild(weightInput);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  exerciseElement.appendChild(deleteButton);

  selectedExercisesContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-button")) {
      const exerciseElement = e.target.parentNode;
      exerciseElement.parentNode.removeChild(exerciseElement);
    }
  });

  selectedExercisesContainer.appendChild(exerciseElement);
}

// credit to patet
