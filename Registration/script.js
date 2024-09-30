document.querySelector("form").addEventListener("submit", function(event) { 
    event.preventDefault(); // Prevent form from submitting the traditional way

    const firstName = document.querySelector("input[type='text']").value;
    const lastName = document.querySelectorAll("input[type='text']")[1].value; // second text input
    const email = document.querySelector("input[type='email']").value;
    const password = document.querySelectorAll("input[type='password']")[0].value;
    const confirmPassword = document.querySelectorAll("input[type='password']")[1].value;
    const termsChecked = document.getElementById("terms").checked;

    // Clear any previous feedback messages
    let feedback = document.querySelector(".feedback");
    if (feedback) {
        feedback.remove();
    }

    // Clear any previous success message or spinner
    let successMessage = document.querySelector(".success-message");
    let spinner = document.getElementById("spinner");
    
    if (successMessage) {
        successMessage.style.display = "none";
    }
    if (spinner) {
        spinner.style.display = "none";
    }

    // Show the spinner animation
    spinner.style.display = "block";

    // Simulate registration processing (e.g., sending to a server)
    setTimeout(function() {
        // Check if passwords match and terms are checked
        if (firstName && lastName && email && password && confirmPassword && termsChecked) {
            if (password === confirmPassword) {
                spinner.style.display = "none"; // Hide spinner once processing is done

                // Show the success message
                successMessage.style.display = "block";
                successMessage.textContent = "Registration Successful!";
                
                // Redirect to the specified homepage after 2 seconds
                setTimeout(function() {
                    window.location.href = 'http://127.0.0.1:5500/'; // Update with your actual homepage path
                }, 2000);
            } else {
                spinner.style.display = "none"; // Hide spinner
                showFeedback("Passwords do not match!", "red");
            }
        } else {
            spinner.style.display = "none"; // Hide spinner
            showFeedback("Please fill out all fields and agree to the terms and conditions.", "red");
        }
    }, 2000); // Simulate a 2 second delay for processing
});

// Helper function to display feedback messages
function showFeedback(message, color) {
    let feedback = document.querySelector(".feedback");
    if (!feedback) {
        feedback = document.createElement("p");
        feedback.classList.add("feedback");
        document.querySelector(".wrapper").appendChild(feedback);
    }
    feedback.textContent = message;
    feedback.style.color = color;
}








