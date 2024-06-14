const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/user');
const consultaRoutes = require('./routes/consultas');
const paqueteConsultasRoutes = require('./routes/paqueteConsultas');
const pagosRoutes = require('./routes/pagos');
const googleRoutes = require('./routes/calendar');
const path = require('path')

app.use('/api/user', userRoutes);
app.use('/api/consultas', consultaRoutes);
app.use('/api/paqueteConsultas',  paqueteConsultasRoutes);
app.use('/api/pagos', pagosRoutes);
app.use('/api/google', googleRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true, 
})
  .then(() => console.log('MongoDB connectado'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el  ${PORT}`);
});