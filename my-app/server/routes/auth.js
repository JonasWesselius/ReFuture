const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Update user profile
router.put('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    console.log('Received update data:', JSON.stringify(req.body, null, 2));

    // Get the current user first
    const currentUser = await User.findById(decoded.userId);
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prepare the update object
    const updateData = {};
    const allowedUpdates = ['name', 'countryOfOrigin', 'location', 'experience', 'languages', 'testScores', 'cvs'];
    
    for (const key of Object.keys(req.body)) {
      if (allowedUpdates.includes(key)) {
        if (key === 'experience' && Array.isArray(req.body[key])) {
          console.log('Processing experience update...');
          
          // Validate and format experience data
          const newExperiences = req.body[key].map(exp => {
            // Validate required fields
            if (!exp.title || !exp.company) {
              throw new Error('Experience must have title and company');
            }
            
            return {
              title: String(exp.title).trim(),
              company: String(exp.company).trim(),
              startDate: exp.startDate ? new Date(exp.startDate) : new Date(),
              endDate: exp.endDate ? new Date(exp.endDate) : null,
              location: String(exp.location || '').trim(),
              type: String(exp.type || 'Full-time').trim(),
              description: String(exp.description || '').trim()
            };
          });

          console.log('Formatted new experiences:', JSON.stringify(newExperiences, null, 2));
          
          // Append to existing experience
          updateData.experience = [...(currentUser.experience || []), ...newExperiences];
          
        } else if (key === 'languages' && Array.isArray(req.body[key])) {
          // Replace languages entirely
          updateData.languages = req.body[key].map(lang => ({
            name: String(lang.name || '').trim(),
            proficiency: String(lang.proficiency || 'Beginner').trim(),
            isLearning: Boolean(lang.isLearning)
          }));
          
        } else if (key === 'testScores' && Array.isArray(req.body[key])) {
          // Replace test scores entirely
          updateData.testScores = req.body[key].map(score => ({
            language: String(score.language || '').trim(),
            score: Number(score.score) || 0,
            maxScore: Number(score.maxScore) || 100,
            stars: Number(score.stars) || 0,
            date: score.date ? new Date(score.date) : new Date()
          }));
          
        } else {
          // For other fields, update directly
          updateData[key] = req.body[key];
        }
      }
    }

    console.log('Final update data:', JSON.stringify(updateData, null, 2));

    // Use findByIdAndUpdate with proper validation
    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      { $set: updateData },
      { 
        new: true, 
        runValidators: true,
        select: '-password'
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Profile updated successfully');
    res.json({ 
      message: 'Profile updated successfully', 
      user: updatedUser 
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ 
      message: 'Error updating profile', 
      error: error.message
    });
  }
});

// Verify token route
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    res.json({ message: 'Token is valid' });
  } catch (error) {
    console.log('Token verification failed:', error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

module.exports = router; 