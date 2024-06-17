const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    duration: { type: Number, required: true, default: 60 }, // duración en minutos
    reserved: { type: Boolean, default: false }
});

const cita = mongoose.model('cita', citaSchema);

module.exports = cita;
