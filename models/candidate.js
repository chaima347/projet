const mongoose = require('mongoose');

// Define the Candidate schema
const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  party: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

// Create and export the Candidate model
module.exports = mongoose.model('Candidate', candidateSchema);
