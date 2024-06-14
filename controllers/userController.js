const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
const bcrypt = require('bcrypt');
const Consulta = require('../models/consultas');


// Registrar un nuevo usuario
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Verificar si el usuario ya existe
  const userExists = await findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'Yá existe este usuario' });
  }

  // Crear el nuevo usuario
  const hashedPassword = await hash(password, 8);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();

  res.status(201).json({ message: 'Usuario registrado' });
};

// Iniciar sesión de usuario
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Verificar el usuario
  const user = await findOne({ email });
  if (!user || !(await compare(password, user.password))) {
    return res.status(401).json({ message: 'Email o contraseña erroneo' });
  }

  // Crear el token JWT
  const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
};

// Obtener perfil de usuario
const getUserProfile = async (req, res) => {
  const user = await findById(req.user.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
};

// Actualizar perfil de usuario
const updateUserProfile = async (req, res) => {
  const user = await findById(req.user.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = await hash(req.body.password, 8);
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
};

const getAdminData = async (req, res) => {
  try {
    // Obtener todas las consultas
    const consultas = await Consulta.find()
      .populate('user')
      .populate('date')
      .populate('zoomlink')
      .populate('status');

    res.json({
      consultas,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener datos de administrador', error });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAdminData,
};