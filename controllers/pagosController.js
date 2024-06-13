const Pago = require('../models/pagos');

async function createPago(req, res) {
  const { paqueteId, amount } = req.body;

  const newPago = new Pago({
    user: req.user._id,
    paquete: paqueteId,
    amount
  });

  const createdPago = await newPago.save();
  res.status(201).json(createdPago);
}

const getPagos = async (req, res) => {
  const pagos = await Pago.find({ user: req.user._id }).populate('paquete');
  res.json(pagos);
};

module.exports = { createPago, getPagos };