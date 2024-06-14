const express = require('express');
const router = express.Router();
const { authorize, authGoogleCallback, createEvent } = require('../controllers/calendarioController');

router.get('/authorize', authorize);
router.get('/auth/google/callback', authGoogleCallback);
router.post('/create-event', createEvent);

module.exports = router;
