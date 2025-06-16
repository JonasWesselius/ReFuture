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

    // Update allowed fields
    const allowedUpdates = ['name', 'countryOfOrigin', 'location', 'experience', 'languages', 'testScores', 'cvs'];
    const updates = Object.keys(req.body).filter(key => allowedUpdates.includes(key));
    
    console.log('Allowed updates:', updates);

    let updateData = {};
    for (const update of updates) {
      console.log(`Processing update for ${update}:`, JSON.stringify(req.body[update], null, 2));
      
      if (update === 'experience' && Array.isArray(req.body[update])) {
        // Create new experience item with proper formatting
        const newExperience = req.body[update][0]; // Only take the first item
        const formattedExp = {
          title: String(newExperience.title || ''),
          company: String(newExperience.company || ''),
          startDate: newExperience.startDate ? new Date(newExperience.startDate) : new Date(),
          endDate: newExperience.endDate ? new Date(newExperience.endDate) : null,
          location: String(newExperience.location || ''),
          type: String(newExperience.type || 'Full-time'),
          description: String(newExperience.description || '')
        };
        console.log('Formatted experience item:', JSON.stringify(formattedExp, null, 2));

        // Use $push to add the new experience item
        updateData.$push = { experience: formattedExp };
      } else if (update === 'testScores' && Array.isArray(req.body[update])) {
        const newTestScores = req.body[update].map(score => ({
          language: String(score.language || ''),
          score: Number(score.score || 0),
          maxScore: Number(score.maxScore || 100),
          stars: Number(score.stars || 0),
          date: score.date ? new Date(score.date) : new Date()
        }));

        if (!updateData.$push) {
          updateData.$push = {};
        }
        updateData.$push.testScores = { $each: newTestScores };
      } else if (update === 'languages' && Array.isArray(req.body[update])) {
        const newLanguages = req.body[update].map(lang => ({
          name: String(lang.name || ''),
          proficiency: String(lang.proficiency || 'Intermediate'),
          isLearning: Boolean(lang.isLearning || false)
        }));

        if (!updateData.$push) {
          updateData.$push = {};
        }
        updateData.$push.languages = { $each: newLanguages };
      } else {
        updateData[update] = req.body[update];
      }
    }

    console.log('Final update data:', JSON.stringify(updateData, null, 2));

    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: decoded.userId },
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      console.log('Profile updated successfully');
      res.json({ message: 'Profile updated successfully', user: updatedUser });
    } catch (updateError) {
      console.error('Error updating user:', updateError);
      res.status(400).json({ 
        message: 'Error updating profile', 
        error: updateError.message,
        details: updateError.errors 
      });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ 
      message: 'Error updating profile', 
      error: error.message,
      stack: error.stack 
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