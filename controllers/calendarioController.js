const { google } = require('googleapis');
const fs = require('fs').promises;
const path = require('path');
const { oAuth2Client } = require('google-auth-library');
const EventoCalendario = require('../models/calendario');


const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, '../credentials.json')));
const { client_secret, client_id, redirect_uris } = credentials.web;

const oAuth2Client = new google.auth.oAuth2(client_id, client_secret, redirect_uris[0]);

const authGoogle = (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  res.redirect(authUrl);
};

const authGoogleCallback = async (req, res) => {
  const code = req.query.code;
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  res.json(tokens);
};

const createEvent = async (req, res) => {
  const { summary, description, start, end, timeZone, userId } = req.body;
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
  const event = {
    summary,
    description,
    start: {
      dateTime: start,
      timeZone: timeZone || 'UTC+2',
    },
    end: {
      dateTime: end,
      timeZone: timeZone || 'UTC+2',
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });

    const newEvent = new EventoCalendario({
      summary,
      description,
      start: new Date(start),
      end: new Date(end),
      timeZone: timeZone || 'UTC+2',
      user: userId,
    });

    await newEvent.save();

    res.json(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  authGoogle,
  authGoogleCallback,
  createEvent,
};