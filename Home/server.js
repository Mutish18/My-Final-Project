const express = require('express');
const path = require('path');

const app = express();

// Middleware to serve static files (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'Public')));

// Serve homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'Home', 'index.html')); // Correct path
});

// Start the server
const port = 5500;
app.listen(port, () => {
    console.log(`Server running on port 5500`);
});




