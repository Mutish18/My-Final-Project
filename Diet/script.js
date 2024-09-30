// Store exercise progress for each day (load from localStorage if available)
let exerciseProgress = JSON.parse(localStorage.getItem('exerciseProgress')) || {};

// Get elements from the form and canvas
const dietForm = document.getElementById('dietForm');
const pieCtx = document.getElementById('dietPieChart').getContext('2d');

// Data tracking for each category
let dietData = {
    carbohydrates: 0,
    proteins: 0,
    vitamins: 0,
    water: 0,
    othersupplements: 0
};

// Initialize Chart.js pie chart
let dietPieChart = new Chart(pieCtx, {
    type: 'pie',
    data: {
        labels: ['Carbohydrates', 'Proteins', 'Vitamins', 'Water', 'Other Supplements'],
        datasets: [{
            label: 'Daily Diet Distribution',
            data: [0, 0, 0, 0, 0],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            borderColor: '#fff',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Diet Distribution'
            }
        }
    }
});

// Handle form submission
dietForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values from the form inputs
    const date = document.getElementById('dateInput').value;

    if (!date) {
        alert('Please select a date for the diet.');
        return;
    }

    // Update the pie chart data immediately on form submission
    updatePieChart();
    
    // Save the data to localStorage
    localStorage.setItem('dietProgress', JSON.stringify(dietData));
});

// Update dietData based on inputs
const updateDietData = (input) => {
    const category = input.getAttribute('data-category');
    if (category && dietData.hasOwnProperty(category)) {
        dietData[category] = parseInt(input.value) || 0; // Ensure it's a number
    }
    updatePieChart();
};

// Add event listeners to input fields for immediate updates
document.querySelectorAll('#dietForm input[type="number"]').forEach(input => {
    input.addEventListener('input', (event) => {
        updateDietData(event.target);
    });
});

// Function to update the pie chart
function updatePieChart() {
    dietPieChart.data.datasets[0].data = [
        dietData.carbohydrates,
        dietData.proteins,
        dietData.vitamins,
        dietData.water,
        dietData.othersupplements
    ];
    dietPieChart.update();
}

// Clear the progress (optional reset button functionality)
function clearProgress() {
    dietData = {
        carbohydrates: 0,
        proteins: 0,
        vitamins: 0,
        water: 0,
        othersupplements: 0
    };

    // Update the pie chart
    updatePieChart();

    // Clear localStorage
    localStorage.removeItem('dietProgress');
}





