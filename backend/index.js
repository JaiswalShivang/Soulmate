const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');

// Configure CORS for production
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://soulmate-git-main-jaiswalshivangs-projects.vercel.app', 'https://soulmate-jaiswalshivang.vercel.app']
    : 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Set port for Vercel deployment
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb+srv://TimeWalker:Nisshchaya4%40@cluster0.41blq.mongodb.net/newproject', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// API routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/mbti', require('./routes/mbtiRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Handle root route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Soulmate API is running' });
});

// Connect to database
connectToDatabase();

// Export for Vercel serverless functions
module.exports = app;