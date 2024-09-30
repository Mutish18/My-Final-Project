// script.js

// Function to handle the button click event
function joinUs() {
    // Redirect to the registration page
    window.location.href = '../Registration/register.html';
}

// Add event listener for the button
document.addEventListener('DOMContentLoaded', () => {
    const joinButton = document.querySelector('.button');
    if (joinButton) {
        joinButton.addEventListener('click', () => {
            // Alert the user before redirecting
            alert("You are about to join Evovle Fitness! Redirecting to registration.");
            joinUs();
        });
    }
});

// Smooth scrolling for any anchor links (if you add them later)
const scrollLinks = document.querySelectorAll('a[href^="#"]');

for (const link of scrollLinks) {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}
