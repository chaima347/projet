const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import the models
const User = require('./models/user');
const Candidate = require('./models/candidate');
const Vote = require('./models/vote');

dotenv.config();
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Route to add a new user
app.post('/add-user', async (req, res) => {
  console.log("Received request on /add-user");
  console.log("Request body:", req.body); // Log the request body

  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    console.log("User saved:", savedUser); // Log the saved user
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error saving user:", error.message); // Log the error
    res.status(400).json({ error: error.message });
  }
});


// Route to add a new candidate
app.post('/add-candidate', async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    const savedCandidate = await candidate.save();
    res.status(201).json(savedCandidate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to cast a vote
app.post('/cast-vote', async (req, res) => {
  try {
    const { voterId, candidateId } = req.body;

    // Create a new vote
    const vote = new Vote({
      voter: voterId,
      candidate: candidateId,
    });
    
    const savedVote = await vote.save();
    res.status(201).json(savedVote);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
