//this code is to wire up the routes so that we can actually test the session features in postman
//so these routes will allow us to: 1)saving a draft session 2)Publishing a session 3)Getting all your sessions
// routes/session.js
const express = require('express');
const router = express.Router();
const {
  saveDraft,
  publishSession,
  getAllSessions
} = require('../controllers/sessionController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /my-sessions/save-draft
router.post('/save-draft', authMiddleware, saveDraft);

// POST /my-sessions/publish
router.post('/publish', authMiddleware, publishSession);

// GET /my-sessions
router.get('/', authMiddleware, getAllSessions);

module.exports = router;