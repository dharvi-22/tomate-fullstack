// server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql');
const hacksRoute = require('./routes/hacks');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON

// MySQL connection pool
const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Create table if it doesn't exist
const createTables = () => {
  const hacksTable = `
    CREATE TABLE IF NOT EXISTS hacks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      tip TEXT,
      category VARCHAR(50) NOT NULL,
      submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.query(hacksTable, (err) => {
    if (err) {
      console.error('Failed to create hacks table:', err.message);
    } else {
      console.log('Hacks table ready');
      insertInitialData(); // Seed only after table creation
    }
  });
};

// Seed the table only if it's empty
const insertInitialData = () => {
  const checkQuery = 'SELECT COUNT(*) AS count FROM hacks';
  db.query(checkQuery, (err, results) => {
    if (err) {
      console.error('Error checking hacks table:', err.message);
      return;
    }

    if (results[0].count === 0) {
      const sampleData = [
        ['Freeze chopped herbs in olive oil', 'Chop herbs and freeze them in an ice cube tray with olive oil for easy use later.', 'Use for soups and sautés', 'freezer'],
        ['Cook grains in bulk', 'Prepare a large batch of rice or quinoa and store in the fridge for the week.', 'Lasts up to 5 days refrigerated', 'batch'],
        ['Pre-cut veggies for stir-fries', 'Slice all your stir-fry vegetables ahead of time and store in airtight containers.', '', 'batch']
      ];

      const insertQuery = 'INSERT INTO hacks (title, description, tip, category) VALUES ?';
      db.query(insertQuery, [sampleData], (err) => {
        if (err) {
          console.error('Error inserting initial data:', err.message);
        } else {
          console.log('Initial data inserted into hacks table');
        }
      });
    } else {
      console.log('Hacks table already has data');
    }
  });
};

// Delay table creation to wait for MySQL startup 
setTimeout(createTables, 3000);



// Routes
app.use('/api/hacks', hacksRoute); // Mount recipe-related routes

// Default route 
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
