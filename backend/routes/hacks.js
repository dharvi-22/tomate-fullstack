

const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Create MySQL connection using environment variables
const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Connect to MySQL and log connection status
//db.connect((err) => {
  //if (err) {
   // console.error('Error connecting to MySQL:', err.message);
  //} else {
  //  console.log('Connected to MySQL database');
  //}
//});

// GET route to fetch all cooking hacks
router.get('/', (req, res) => {
  db.query('SELECT * FROM hacks', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      return res.status(500).json({ error: 'Failed to fetch hacks' });
    }

    res.status(200).json(results);
  });
});

//post route to add a new cooking hack
router.post('/', (req, res) => {
  const { title, description, tip, category } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({error: 'Title, description and category are required'});
  }

  const query = 'INSERT INTO hacks (title, description, tip, category) VALUES (?,?,?,?)';
  db.query(query, [title, description, tip || null, category], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err.message);
      return res.status(500).json({ error: 'Failed to add hack'});
    }

    res.status(201).json({message: 'Hack added successfully', id: results.insertId });
  });
});

module.exports = router;