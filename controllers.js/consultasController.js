const Consulta = require('../models/consultas');

const createConsulta = async (req, res) => {
  const { userId, date, zoomLink } = req.body;

  const consulta = await Consulta.create({
    user: userId,
    date,
    zoomLink,
  });

  if (consulta) {
    res.status(201).json(consulta);
  } else {
    res.status(400).json({ message: 'Datos de consulta invalidos' });
  }
};

const getConsultas = async (req, res) => {
  const consultas = await Consulta.find({ user: req.user._id });

  if (consultas) {
    res.json(consultas);
  } else {
    res.status(404).json({ message: 'Consulta no encontrada' });
  }
};

module.exports = { createConsulta, getConsultas };