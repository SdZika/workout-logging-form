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


//==================================================== Natasa's and Milutin's part 

const calorieForm = document.getElementById("calorie-form");
const calorieLog = document.getElementById("calorie-log");

calorieForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const date = document.getElementById("calorie-date").value;
    const caloriesNumber = parseInt(document.getElementById("calories").value);

    const caloriesIntake = { date, caloriesNumber };

    addCaloriesToLog(caloriesIntake);
    updateCaloriesChart();
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
    const editButtonCalories = document.createElement("button");
    editButtonCalories.textContent = "Edit";
    const saveButtonCalories = document.createElement("button");
    saveButtonCalories.textContent = "Save";
    saveButtonCalories.style.display = "none";
    const deleteButtonCalories = document.createElement("button");
    deleteButtonCalories.textContent = "Delete";

    caloriesActions.appendChild(editButtonCalories);
    caloriesActions.appendChild(deleteButtonCalories);
    caloriesActions.appendChild(saveButtonCalories);
    caloriesEntry.appendChild(caloriesDetails);
    caloriesEntry.appendChild(caloriesActions);
    calorieLog.appendChild(caloriesEntry);

    editButtonCalories.addEventListener("click", () => editCalories(caloriesEntry, caloriesIntake, saveButtonCalories, editButtonCalories));
    saveButtonCalories.addEventListener("click", () => saveCalories(caloriesEntry, caloriesIntake, saveButtonCalories, editButtonCalories));
    deleteButtonCalories.addEventListener("click", () => deleteCalories(caloriesEntry, caloriesIntake.date));
}

function editCalories(entry, caloriesIntake, saveButtonCalories, editButtonCalories) {
    const caloriesDetails = entry.querySelector(".calories-details");
    caloriesDetails.innerHTML = `
        <strong>Date:</strong><input type="date" class="edit-date" value="${caloriesIntake.date}"><br>
        <strong>Calories:</strong><input type="number" class="edit-calories-number" value="${caloriesIntake.caloriesNumber}">
    `;

    saveButtonCalories.style.display = "inline";
    editButtonCalories.style.display = "none";
}

function saveCalories(entry, caloriesIntake, saveButtonCalories, editButtonCalories) {
    const newDate = entry.querySelector(".edit-date").value;
    const newCaloriesNumber = parseInt(entry.querySelector(".edit-calories-number").value);

    caloriesIntake.date = newDate;
    caloriesIntake.caloriesNumber = newCaloriesNumber;

    const caloriesDetails = entry.querySelector(".calories-details");
    caloriesDetails.innerHTML = `
        <strong>Date:</strong> ${caloriesIntake.date} <br>
        <strong>Calories:</strong> ${caloriesIntake.caloriesNumber} kcal <br>
    `;

    saveButtonCalories.style.display = "none";
    editButtonCalories.style.display = "inline";

    updateCaloriesChart();
}

function deleteCalories(entry, date) {
    entry.remove();
    updateCaloriesChart();
}

function updateCaloriesChart() {
    // Clear previous data
    caloriesChart.data.labels = [];
    caloriesChart.data.datasets[0].data = [];

    // Get all current entries
    const calorieEntries = document.querySelectorAll('.calories-entry .calories-details');
    calorieEntries.forEach(entry => {
        const dateText = entry.querySelector('input.edit-date')?.value || entry.innerText.match(/Date: (.*)\n/)[1].trim();
        const caloriesText = entry.querySelector('input.edit-calories-number')?.value || entry.innerText.match(/Calories: (\d+)/)[1].trim();

        const date = dateText.trim();
        const caloriesNumber = parseInt(caloriesText);

        // Debugging output
        console.log(`Date: ${date}, Calories: ${caloriesNumber}`);

        const index = caloriesChart.data.labels.indexOf(date);
        if (index !== -1) {
            caloriesChart.data.datasets[0].data[index] += caloriesNumber;
        } else {
            caloriesChart.data.labels.push(date);
            caloriesChart.data.datasets[0].data.push(caloriesNumber);
        }
    });

    

    caloriesChart.update();
}

// Initialize calorie chart
const kcalChart = document.getElementById('calorieChart').getContext('2d');
const caloriesChart = new Chart(kcalChart, {
    type: 'bar',
    data: {
        labels: [], // Dates
        datasets: [{
            label: 'Calories Intake (kcal)',
            data: [], // Calories Number
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


//===================================================== Milena's Part
document.addEventListener('DOMContentLoaded', () => {
    const weightForm = document.getElementById('weightForm');
    const weightDateInput = document.getElementById('weight-date');
    const weightInput = document.getElementById('weight');
    const weightLogDiv = document.getElementById('weight-log');
    const weightChartCanvas = document.getElementById('weightChart');
    const ctx = weightChartCanvas.getContext('2d');

    let weightEntries = [];

    weightForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const entryDate = weightDateInput.value;
        const weight = parseFloat(weightInput.value);

        const weightEntry = {
            date: new Date(entryDate),
            weight
        };

        weightEntries.push(weightEntry);
        displayWeightEntries();
        drawChart();

        weightForm.reset();
    });

    function displayWeightEntries() {
        weightLogDiv.innerHTML = '';

        weightEntries.forEach((entry, index) => {
            const div = document.createElement('div');
            div.className = 'weight-entry';
            div.innerHTML = `
                <strong>${entry.date.toDateString()}</strong> - ${entry.weight} kg
                <button class="delete-button" data-index="${index}">Delete</button>
            `;
            weightLogDiv.appendChild(div);

            const deleteButton = div.querySelector('.delete-button');
            deleteButton.addEventListener('click', () => {
                weightEntries.splice(index, 1);
                displayWeightEntries();
                drawChart();
            });
        });
    }

    function drawChart() {
        
        ctx.clearRect(0, 0, weightChartCanvas.width, weightChartCanvas.height);

        if (weightEntries.length === 0) {
            return;
        }

        // Sort entries by date
        weightEntries.sort((a, b) => a.date - b.date);

        // Get the dates and weights
        const dates = weightEntries.map(entry => entry.date);
        const weights = weightEntries.map(entry => entry.weight);

        // Define the chart area
        const padding = 50;
        const chartWidth = weightChartCanvas.width - padding * 2;
        const chartHeight = weightChartCanvas.height - padding * 2;
        const maxWeight = Math.max(...weights);
        const minWeight = Math.min(...weights);
        const maxDate = dates[dates.length - 1];
        const minDate = dates[0];

        // Draw the axes
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, chartHeight + padding);
        ctx.lineTo(chartWidth + padding, chartHeight + padding);
        ctx.stroke();

        // Draw the labels
        ctx.fillText(maxWeight + ' kg', padding - 40, padding);
        ctx.fillText(minWeight + ' kg', padding - 40, chartHeight + padding);
        ctx.fillText(minDate.toDateString(), padding, chartHeight + padding + 20);
        ctx.fillText(maxDate.toDateString(), chartWidth + padding - 50, chartHeight + padding + 20);

        // Draw the data points and lines
        ctx.beginPath();
        for (let i = 0; i < weightEntries.length; i++) {
            const x = padding + (dates[i] - minDate) / (maxDate - minDate) * chartWidth;
            const y = chartHeight + padding - (weights[i] - minWeight) / (maxWeight - minWeight) * chartHeight;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }

            // Draw the data points
            ctx.arc(x, y, 3, 0, Math.PI * 2, true);
        }
        ctx.stroke();
    }
});
