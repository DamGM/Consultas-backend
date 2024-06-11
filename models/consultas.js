const mongoose = require('mongoose');

const ConsultaSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  zoomLink: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pendiente', 'completada', 'cancelada'],
    default: 'pendiente',
  },
}, {
  timestamps: true,
});

const Consultas = mongoose.model('Consulta', ConsultaSchema);
module.exports = Consulta;