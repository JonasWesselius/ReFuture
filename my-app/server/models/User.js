const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profilePicture: {
    type: String,
    default: null
  },
  countryOfOrigin: {
    type: String,
    trim: true
  },
  location: {
    city: String,
    region: String,
    country: String
  },
  connections: {
    type: Number,
    default: 0
  },
  experience: [{
    title: String,
    company: String,
    startDate: Date,
    endDate: Date,
    location: String,
    type: String,
    description: String
  }],
  languages: [{
    name: String,
    proficiency: String,
    isLearning: Boolean
  }],
  testScores: [{
    language: String,
    score: Number,
    maxScore: Number,
    stars: Number,
    date: Date
  }],
  cvs: [{
    name: String,
    description: String,
    createdAt: Date,
    updatedAt: Date
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User; 