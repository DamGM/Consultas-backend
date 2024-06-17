const express = require('express');
const router = express.Router();
const passport = require('../config/passport'); 

// Ruta para iniciar la autenticación con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta de callback de Google
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Autenticación realizada, redirige a la página deseada
    res.redirect('/TuArea');
  }
);

module.exports = router;
