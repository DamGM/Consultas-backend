const Paquete = require('../models/paquete');

const getPaquetes = async (req, res) => {
  const paquetes = await Paquete.find({});
  res.json(paquetes);
};

const createPaquete = async (req, res) => {
  const { name,descripción, numeroConsultas, price } = req.body;
  
  const newPaquete = new Paquete({
    name,
    descripción,
    numeroConsultas,
    price
  });

  const createdPaquete = await newPaquete.save();
  res.status(201).json(createdPaquete);
};

module.exports = { getPaquetes, createPaquete };