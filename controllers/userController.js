const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
const bcrypt = require('bcrypt');
const Consulta = require('../models/consultas');
const { json } = require('express');



// Registrar un nuevo usuario
const registerUser = async (req, res) => {
  const { name, email, password} = req.body;
 
  
  // Verificar si el usuario ya existe
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'Yá existe este usuario' });
  }

  // encriptar contraseña
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt)
  
  // Crear el nuevo usuario
  const newUser = new User({
    name: name,
    email: email,
    password: hashedPassword,

  });

  const user = await newUser.save();
  const token = createToken (user._id)
  console.log('Token generado:', token);
  res.status(201).json({ message: 'Usuario registrado' });
  
};


// Iniciar sesión de usuario
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('intento de login');
  try {
    // encontrar el email
    const user = await User.findOne({ email });

    if (!user) {
      console.log('Usuario no encontrado');
      return res.status(401).json({ message: 'Email erróneo' });
    }
    console.log('Usuario encontrado:', user);
    console.log('Contraseña almacenada (hashed):', user.password);
    
    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('¿Contraseña válida?:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('Contraseña erronea');
      return res.status(401).json({ message: 'contraseña errónea' });
    }
     // Crear el token JWT
     const token = createToken(user._id);
     console.log('Token generado:', token);
 
     // Enviar respuesta con el token  el estado de admin
     res.json({
       token,
       isAdmin: user.isAdmin,

     });

} catch (error) {
  console.error('Error al iniciar sesión:', error);
  res.status(500).json({ message: 'Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.' });
}
};
// Crear el token JWT
const createToken = (id) => {
  return jwt.sign({id},process.env.JWT_SECRET, { expiresIn: '1h' });
 
}

// Obtener perfil de usuario
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
};

// Actualizar perfil de usuario
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
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