const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true, default: 60 }, // duración en minutos
    reserved: { type: Boolean, default: false }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
