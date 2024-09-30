const express = require('express');
const path = require('path');

const app = express();
const PORT = 11000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'Landing')));

// Route for the landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'Home.html')); // Update this line
});

app.listen(PORT, () => {
    console.log(`Server is running at port 11000`);
});

