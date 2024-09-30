const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs'); // To hash passwords
const path = require('path'); // For handling file paths
const app = express();

// Middleware to parse JSON and form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',    // Your MySQL host
    user: 'root',         // Your MySQL username
    password: 'Benjamin2801#', // Your MySQL password
    database: 'registration_info' // Your MySQL database
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Route for handling registration form submission
app.post('/register', (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Check if all fields are provided
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).send('All fields are required.');
    }

    // Hash the password before saving it in the database
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).send('Error encrypting password.');
        }

        // Insert user data into MySQL database
        const query = `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;

        db.execute(query, [firstName, lastName, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);

                // Check for unique constraint error (email already exists)
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).send('Email already registered. Please use a different email.');
                }

                return res.status(500).send('Registration failed. Please try again.');
            }

            // On success, redirect to the homepage
            res.redirect('/'); // Redirect to the homepage
        });
    });
});

// Serve homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'Home', 'index.html')); // Update path based on your directory structure
});

// Start the server
const port = 7000;
app.listen(port, () => {
    console.log(`Server running on port 7000`);
});


