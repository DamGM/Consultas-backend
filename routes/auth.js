const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();
const JWT_SECRET = 'SECRET_KEY';


router.post('/Registrarse', async (req, res) => {
  try {
    const { username, password,email, isAdmin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({ username, password: hashedPassword,email, isAdmin });
    await user.save();
    res.status(201).send('Usuario registrado');
  } catch (error) {
    res.status(400).send('Error en el registro');
  }
});

module.exports = router;

// Inicio de sesión
app.post('/Acceder', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).send('Credenciales incorrectas');
    }
  });

  // Middleware de autenticación
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
};
// Rutas de administración protegidas
app.get('/admin/available-slots', authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) return res.sendStatus(403);

  try {
    const slots = await AvailableSlot.find();
    res.json(slots);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/admin/available-slots', authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) return res.sendStatus(403);

  const { start, end } = req.body;
  const newSlot = new AvailableSlot({
    start: new Date(start),
    end: new Date(end),
    available: true,
  });

  try {
    const savedSlot = await newSlot.save();
    res.json(savedSlot);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put('/admin/available-slots/:id', authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) return res.sendStatus(403);

  const { id } = req.params;
  const { available } = req.body;

  try {
    const updatedSlot = await AvailableSlot.findByIdAndUpdate(id, { available }, { new: true });
    res.json(updatedSlot);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/admin/assigned-consultations', authenticateToken, async (req, res) => {
  if (!req.user.isAdmin) return res.sendStatus(403);

  try {
    const consultations = await AssignedConsultation.find().populate('userId');
    res.json(consultations);
  } catch (error) {
    res.status(500).send(error);
  }
});
