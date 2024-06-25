const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user'); 
const fs = require('fs');
const path = require('path');


// Credenciales de Google

const credentialsPath = path.join(__dirname, '../credentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath));
const GOOGLE_CALLBACK_URL = "http://localhost:8080/api/v1/auth/login/google/callback"

const { client_id, client_secret} = credentials.web;

passport.use(new GoogleStrategy({
  clientID: client_id,
  clientSecret: client_secret,
  callbackURL: GOOGLE_CALLBACK_URL,
  passReqToCallback:true
},
async (req, accessToken, refreshToken, profile, cb) => { 
  const { id, displayName, emails} = profile;
  const email = emails[0].value;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name: displayName,
        email: email,
        googleId: id,
        password: '', 
      });
      await user.save();
    }

    return cb(null, user);
  } catch (error) {
    return cb(error, false);
  }
}));

passport.serializeUser((user, cb) => {
  console.log("Usuario serializado:", user)
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findById(id);
    cb(null, user);
  } catch (error) {
    console.log("Error en deserializar:", err)
    cb(error, false);
  }
});

module.exports = passport;
