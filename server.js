const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/user');
const consultationRoutes = require('./routes/consultas');
const paqueteConsultasRoutes = require('./routes/paqueteConsultas');
const pagosRoutes = require('./routes/pagos');

app.use('/api/users', userRoutes);
app.use('/api/consultas', consultationRoutes);
app.use('/api/paqueteConsultas',  paqueteConsultasRoutes);
app.use('/api/pagos', pagosRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connectado'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el  ${PORT}`);
});