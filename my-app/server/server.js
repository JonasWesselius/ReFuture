const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const path = require('path');

dotenv.config();

const app = express();

global.SERVER_START_TIME = Date.now();
console.log('Server start time:', new Date(global.SERVER_START_TIME).toISOString());

app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log('Incoming request:', {
    path: req.path,
    method: req.method,
    hasAuth: !!req.headers.authorization,
    authHeader: req.headers.authorization
  });
  next();
});

app.use((req, res, next) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      console.log('Found token:', token.substring(0, 20) + '...');
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      console.log('Token issued at:', new Date(decoded.iat * 1000).toISOString());
      console.log('Server start time:', new Date(global.SERVER_START_TIME).toISOString());
      
      if (decoded.iat * 1000 < global.SERVER_START_TIME) {
        console.log('Token is older than server start time - invalidating');
        return res.status(401).json({ message: 'Server was restarted. Please log in again.' });
      }
    } catch (error) {
      console.log('Token verification error:', error.message);
    }
  } else {
    console.log('No authorization header found in request');
  }
  next();
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/refuture')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/auth', require('./routes/auth'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 