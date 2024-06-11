const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();


app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);

mongoose.connect('mongodb://localhost:27017/consultas', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = app;
