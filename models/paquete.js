const mongoose = require('mongoose');

const paqueteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  descrición: {
    type: String,
    required: true,
  },
  numberOfConsultas: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Paquete = mongoose.model('Paquete', paqueteSchema);

module.exports = Paquete;