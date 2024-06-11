const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  paquete: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Paquete',
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  pagoDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pendiente', 'completado', 'fallido'],
    default: 'completado',
  },
});

const Pago = mongoose.model('Pago', pagoSchema);

module.exports = Pago;