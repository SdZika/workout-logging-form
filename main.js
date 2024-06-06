//FUNCTION 1: WORKOUT LOG AND EDIT 

const workoutForm = document.getElementById('workout-form');
const workoutLog = document.getElementById('workout-log');

workoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const date = document.getElementById('workout-date').value;
    const type = document.getElementById('workout-type').value;
    const duration = document.getElementById('workout-duration').value;
    const notes = document.getElementById('workout-notes').value;

    const workout = {
        date,
        type,
        duration,
        notes
    };

    addWorkoutToLog(workout);
    updateWorkoutChart(date, duration);
    workoutForm.reset();
});

function addWorkoutToLog(workout) {
    const workoutEntry = document.createElement('div');
    workoutEntry.className = 'workout-entry';

    const workoutDetails = document.createElement('div');
    workoutDetails.className = 'workout-details';
    workoutDetails.innerHTML = `
        <strong>Date:</strong> ${workout.date} <br>
        <strong>Type:</strong> ${workout.type} <br>
        <strong>Duration:</strong> ${workout.duration} minutes <br>
        <strong>Notes:</strong> ${workout.notes || 'None'}
    `;

    const workoutActions = document.createElement('div');
    workoutActions.className = 'workout-actions';
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.style.display = 'none'; // Hide the save button initially
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    workoutActions.appendChild(editButton);
    workoutActions.appendChild(saveButton);
    workoutActions.appendChild(deleteButton);
    workoutEntry.appendChild(workoutDetails);
    workoutEntry.appendChild(workoutActions);
    workoutLog.appendChild(workoutEntry);

    editButton.addEventListener('click', () => editWorkout(workoutEntry, workout, saveButton, editButton));
    saveButton.addEventListener('click', () => saveWorkout(workoutEntry, workout, saveButton, editButton));
    deleteButton.addEventListener('click', () => deleteWorkout(workoutEntry, workout.date, workout.duration));
}

function editWorkout(entry, workout, saveButton, editButton) {
    const workoutDetails = entry.querySelector('.workout-details');
    workoutDetails.innerHTML = `
        <strong>Date:</strong> <input type="date" class="edit-date" value="${workout.date}"> <br>
        <strong>Type:</strong> <input type="text" class="edit-type" value="${workout.type}"> <br>
        <strong>Duration:</strong> <input type="number" class="edit-duration" value="${workout.duration}"> minutes <br>
        <strong>Notes:</strong> <input type="text" class="edit-notes" value="${workout.notes || ''}">
    `;

    saveButton.style.display = 'inline'; // Show the save button
    editButton.style.display = 'none'; // Hide the edit button
}

function saveWorkout(entry, workout, saveButton, editButton) {
    const newDate = entry.querySelector('.edit-date').value;
    const newType = entry.querySelector('.edit-type').value;
    const newDuration = entry.querySelector('.edit-duration').value;
    const newNotes = entry.querySelector('.edit-notes').value;

    workout.date = newDate;
    workout.type = newType;
    workout.duration = newDuration;
    workout.notes = newNotes;

    const workoutDetails = entry.querySelector('.workout-details');
    workoutDetails.innerHTML = `
        <strong>Date:</strong> ${workout.date} <br>
        <strong>Type:</strong> ${workout.type} <br>
        <strong>Duration:</strong> ${workout.duration} minutes <br>
        <strong>Notes:</strong> ${workout.notes || 'None'}
    `;

    saveButton.style.display = 'none'; // Hide the save button
    editButton.style.display = 'inline'; // Show the edit button
}

function deleteWorkout(entry, date, duration) {
    entry.remove();
    updateWorkoutChart(date, -duration); // Remove duration from chart
}

function updateWorkoutChart(date, duration) {
    const index = workoutChart.data.labels.indexOf(date); // Find the index of the date in the labels array
     // If the date already exists in the labels array
    if (index !== -1) {
        workoutChart.data.datasets[0].data[index] += parseInt(duration);// Add the new duration to the existing duration for that date
    } else {
        // If the date does not exist in the labels array
        workoutChart.data.labels.push(date); // Add the new date to the labels array
        workoutChart.data.datasets[0].data.push(parseInt(duration)); // Add the new duration to the data array
    }
    workoutChart.update(); // Update the chart to reflect the changes
}

//PROGRES CHART
const ctx = document.getElementById('workoutChart').getContext('2d');
const workoutChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [], // Dates
        datasets: [{
            label: 'Workout Duration (minutes)',
            data: [], // Durations
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});


// Natasa's part 

const calorieForm = document.getElementById("calorie-form");
const calorieLog = document.getElementById("calorie-log");

calorieForm.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const date = document.getElementById("calorie-date").value; 
    const caloriesNumber = document.getElementById("calories").value; 

    const caloriesIntake = {
        date, 
        caloriesNumber
    };

    addCaloriesToLog(caloriesIntake); 
    //updateCaloriesChart(); 
    calorieForm.reset(); 
});

function addCaloriesToLog(caloriesIntake) { 
    const caloriesEntry = document.createElement("div"); 
    caloriesEntry.className = "calories-entry"; 

    const caloriesDetails = document.createElement("div"); 
    caloriesDetails.className = "calories-details"; 
    caloriesDetails.innerHTML = `
        <strong>Date:</strong> ${caloriesIntake.date} <br>
        <strong>Calories:</strong> ${caloriesIntake.caloriesNumber} kcal <br>
    `;

    const caloriesActions = document.createElement("div"); 
    caloriesActions.className = "calories-actions"; 
    const editCalories = document.createElement("button"); 
    editCalories.textContent = "Edit";
    const deleteCalories = document.createElement("button");
    deleteCalories.textContent = "Delete"; 
    const saveCalories = document.createElement("button");
    saveCalories.textContent = "Save"; 
    saveCalories.style.display = "none"; 

    caloriesActions.appendChild(editCalories);
    caloriesActions.appendChild(deleteCalories);
    caloriesEntry.appendChild(caloriesDetails);
    caloriesEntry.appendChild(caloriesActions);
    calorieLog.appendChild(caloriesEntry); 

    editCalories.addEventListener("click", () => editCalories(caloriesEntry, caloriesIntake, saveCalories, editCalories));
    deleteCalories.addEventListener("click", () => deleteCalories(caloriesEntry, caloriesIntake.date, caloriesIntake.caloriesNumber));
    saveCalories.addEventListener("click", () => saveCalories(caloriesEntry, caloriesIntake, saveCalories, editCalories));

};