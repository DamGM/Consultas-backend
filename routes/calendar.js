const express = require('express');
const router = express.Router();
const User = require('../models/user'); 
const Appointment = require('../models/calendario'); 

// Ruta para crear una nueva cita
router.post('/citas', async (req, res) => {
    const { userId, date } = req.body;
    const appointment = new Appointment({ user: userId, date });
    await appointment.save();

    const user = await User.findById(userId);
    user.appointments.push(appointment);
    await user.save();

    res.json(appointment);
});

// Ruta para obtener citas de un usuario
router.get('/user/:userId', async (req, res) => {
    const user = await User.findById(req.params.userId).populate('appointments');
    res.json(user);
});

module.exports = router;

