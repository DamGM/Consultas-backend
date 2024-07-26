const Consulta = require('../models/consultas');

const createConsulta = async (req, res) => {
  const { userId, date, zoomLink } = req.body;

  const consulta = await create({
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
  try {
    const consultas = await Consulta.find()
      .populate('user')  
      .populate('date') 
      .exec();
    
    res.json(consultas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener consultas', error });
  }
};

module.exports = { createConsulta, getConsultas };