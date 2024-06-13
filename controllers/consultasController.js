import { create, find } from '../models/consultas';

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
  const consultas = await find({ user: req.user._id });

  if (consultas) {
    res.json(consultas);
  } else {
    res.status(404).json({ message: 'Consulta no encontrada' });
  }
};

export default { createConsulta, getConsultas };