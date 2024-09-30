// Import required packages
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 6000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (HTML, CSS, JS, images)

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',        // Replace with your MySQL host
    user: 'root',             // Replace with your MySQL username
    password: 'Benjamin2801#',// Replace with your MySQL password
    database: 'diet_data'   // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Serve the main HTML file (Gym Routine Tracker)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission for diet tracking
app.post('/submit-diet', (req, res) => {
  const { date, foodCategory, carbohydrate, protein, vitamin, water, supplements } = req.body;

  // MySQL query to insert data into the 'diet_data' table
  const query = 'INSERT INTO diet_data (date, foodCategory, carbohydrate, protein, vitamin, water, supplements) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
  db.query(query, [date, foodCategory, carbohydrate, protein, vitamin, water, supplements], (err, result) => {
    if (err) {
      console.error('Error saving diet data:', err);
      res.status(500).send('Error saving diet data.');
      return;
    }
    
    res.status(200).json({ message: 'Diet data saved successfully!' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port 6000`);
});
