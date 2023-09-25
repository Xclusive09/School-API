const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());

const studentRoutes = require('./src/routes/studentsRoutes');
app.use('/api', studentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
