const mongoose = require('mongoose');

const eventoCalendarioSchema = new mongoose.Schema({
  summary: { type: String, required: true },
  description: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  timeZone: { type: String, default: 'UTC+2' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('EventoCalendario', eventoCalendarioSchema);
