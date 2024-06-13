const { google } = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'credencials.json')));
const { client_secret, client_id, redirect_uris } = credentials.installed;

const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

app.get('/auth/google', (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  res.redirect(authUrl);
});

app.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code;
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  res.json(tokens);
});

app.post('/create-event', async (req, res) => {
  const { summary, description, start, end, timeZone } = req.body;
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
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error);
  }
});