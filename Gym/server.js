const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Replace with your MySQL username
    password: 'Benjamin2801#',  // Replace with your MySQL password
    database: 'gym_tracker'
});

db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Route to save workout data
app.post('/save-workout', (req, res) => {
    const { date, exercise, reps, sets } = req.body;
    const query = 'INSERT INTO workout_data (date, exercise, reps, sets) VALUES (?, ?, ?, ?)';
    db.query(query, [date, exercise, reps, sets], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving workout data.');
            return;
        }
        res.status(200).send('Workout data saved successfully.');
    });
});

// Route to get workout data for a specific day
app.get('/get-workout/:date', (req, res) => {
    const { date } = req.params;
    const query = 'SELECT * FROM workout_data WHERE date = ?';
    db.query(query, [date], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching workout data.');
            return;
        }
        res.status(200).json(results);
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port 5000`);
});
