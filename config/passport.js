const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user'); 
const fs = require('fs');
const path = require('path');

// Credenciales de Google

const credentialsPath = path.join(__dirname, '..', 'credentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsPath));

const { client_id, client_secret} = credentials.web;

passport.use(new GoogleStrategy({
  clientID: client_id,
  clientSecret: client_secret,
  callbackURL: "/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => { 
  const { id, displayName, emails } = profile;
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

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

module.exports = passport;
