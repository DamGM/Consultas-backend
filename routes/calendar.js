const express = require('express');
const router = express.Router();
const cita = require('../models/calendario');

// Obtener todas las citas
router.get('/', async (req, res) => {
    try {
        const appointments = await cita.find();
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Crear una nueva cita
router.post('/', async (req, res) => {
    const { date, duration } = req.body;

    const cita = new cita({
        date,
        duration
    });

    try {
        const newCita = await cita.save();
        res.status(201).json(newCita);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Reservar una cita
router.patch('/reserva/:id', async (req, res) => {
    try {
        const cita = await cita.findById(req.params.id);
        if (!cita) return res.status(404).json({ message: 'Cita no encontrada' });

       cita.reserved = true;
        const updatedCita = await cita.save();
        res.json(updatedCita);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Eliminar una cita
router.delete('/:id', async (req, res) => {
    try {
        const cita = await cita.findById(req.params.id);
        if (!cita) return res.status(404).json({ message: 'Cita no encontrada' });

        await cita.remove();
        res.json({ message: 'Cita eliminada' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
