const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 3000;
const dbUrl = process.env.MONGO_URI; 

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());

const studentRoutes = require('./routes/studentRoutes');
app.use('/api', studentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
