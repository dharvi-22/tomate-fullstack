// server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const hacksRoute = require('./routes/hacks');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON

// Routes
app.use('/api/hacks', hacksRoute); // Mount recipe-related routes

// Default route (optional)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
