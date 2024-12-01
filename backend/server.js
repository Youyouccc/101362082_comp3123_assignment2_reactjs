const express = require('express');
const connectDB = require('./db');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const cors = require('cors');

require('dotenv').config();
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use('/api', userRoutes);
app.use('/api', employeeRoutes);

// Start server
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
