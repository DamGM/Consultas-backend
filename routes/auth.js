const express = require('express');
const router = express.Router();
const passport = require('../config/passport'); 


router.get("/", (req,res) => {
  res.send('<a href="/login/google">Autentificación con Google</a>')
});

// Ruta para iniciar la autenticación con Google
router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta de callback de Google
router.get('/google/callback', 
  passport.authenticate('google', {
  successRedirect:process.env.CLIENT_URL + "/Area-Personal",
  failureRedirect:process.env.CLIENT_URL + "/Acceder"
}))

router.get("/auth/login",async(req,res)=>{

  if(req.user){
      res.status(200).json({message:"Usuario logeado",user:req.user})
  }else{
      res.status(400).json({message:"No autorizado"})
  }
})

router.get("/logout",(req,res,next)=>{
  req.logout(function(err){
      if(err){return next(err)}
      res.redirect(process.env.CLIENT_URL);
  })
})
module.exports = router;
