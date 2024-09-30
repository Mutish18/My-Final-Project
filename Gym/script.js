// Store exercise progress for each day (load from localStorage if available)
let exerciseProgress = JSON.parse(localStorage.getItem('exerciseProgress')) || {};

// Get elements from the form and canvas
const exerciseForm = document.getElementById('exerciseForm');
const ctx = document.getElementById('exerciseChart').getContext('2d');

// Initialize Chart.js bar chart
let exerciseChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Arms', 'Legs', 'Back', 'Shoulders', 'Abs', 'Chest'],
        datasets: [{
            label: 'Total Reps',
            data: [0, 0, 0, 0, 0, 0],
            backgroundColor: [
                '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
            ],
            borderColor: '#000',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 100 // Set limit of y-axis to 100
            }
        },
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Workout Progress (Total Reps by Exercise)'
            }
        }
    }
});

// Handle form submission
exerciseForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values from the form inputs
    const exercise = document.getElementById('exerciseSelect').value;
    const reps = parseInt(document.getElementById('repsInput').value) || 0;
    const sets = parseInt(document.getElementById('setsInput').value) || 0;
    const date = document.getElementById('dateInput').value;

    if (!date) {
        alert('Please select a date for the workout');
        return;
    }

    if (reps > 0 && sets > 0) {
        // Calculate total reps for this exercise
        const totalReps = reps * sets;

        // Initialize exercise data for the selected date if not already present
        if (!exerciseProgress[date]) {
            exerciseProgress[date] = {
                arms: 0,
                legs: 0,
                back: 0,
                shoulders: 0,
                abs: 0,
                chest: 0
            };
        }

        // Update the exercise data for the selected date
        exerciseProgress[date][exercise] += totalReps;

        // Save progress to localStorage
        localStorage.setItem('exerciseProgress', JSON.stringify(exerciseProgress));

        // Clear form inputs
        document.getElementById('repsInput').value = '';
        document.getElementById('setsInput').value = '';

        // Update the chart for the selected date
        updateChart(date);
    } else {
        alert('Please enter valid values for reps and sets.');
    }
});

// Function to update the chart based on the selected date
function updateChart(date) {
    if (exerciseProgress[date]) {
        // Get exercise data for the selected date
        const data = exerciseProgress[date];

        // Update the chart data
        exerciseChart.data.datasets[0].data = [
            data.arms, data.legs, data.back, data.shoulders, data.abs, data.chest
        ];

        // Update the chart
        exerciseChart.update();
    }
}

// Function to clear saved progress (optional)
function clearProgress() {
    if (confirm("Are you sure you want to clear all saved progress?")) {
        localStorage.removeItem('exerciseProgress');
        exerciseProgress = {};
        exerciseChart.data.datasets[0].data = [0, 0, 0, 0, 0, 0];
        exerciseChart.update();
    }
}

// Function to load progress for a specific date on page load (optional)
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dateInput').value = today; // Set today's date by default
    updateChart(today);
});















