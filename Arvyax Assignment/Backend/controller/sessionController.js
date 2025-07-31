//this file will control the entire session and bring our session model to life with its controller logic
//we'll use saveDraft()- saves the session as a draft
//publishSession() - updates the status of the session to published
//getAllSessions() - fetches session for the logged-in user
// controllers/sessionController.js
const Session = require('../models/Session');
const jwt = require('jsonwebtoken');

// Helper to get user ID from token
const getUserIdFromRequest = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch {
    return null;
  }
};

// Save session as draft
exports.saveDraft = async (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const { title, tags, json_file_url } = req.body;

  try {
    const newSession = new Session({//imp section as it creates and saves the session to MongoDB Atlas
      user_id: userId,
      title,
      tags,
      json_file_url,
      status: 'draft',
    });

    await newSession.save();
    res.status(201).json({ message: 'Draft saved successfully', session: newSession });
  } catch (err) {
    res.status(500).json({ message: 'Failed to save draft', error: err.message });
  }
};

// Publish session
exports.publishSession = async (req, res) => {
  const userId = getUserIdFromRequest(req);//imp line as it extracts user ID from the JWT token
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const { sessionId } = req.body;

  try {
    const session = await Session.findOne({ _id: sessionId, user_id: userId });
    if (!session) return res.status(404).json({ message: 'Session not found' });

    session.status = 'published';
    session.updated_at = new Date();
    await session.save();

    res.status(200).json({ message: 'Session published successfully', session });
  } catch (err) {
    res.status(500).json({ message: 'Failed to publish session', error: err.message });
  }
};

// Get all sessions by the logged-in user
exports.getAllSessions = async (req, res) => {
  const userId = getUserIdFromRequest(req);
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const sessions = await Session.find({ user_id: userId });
    res.status(200).json({ sessions });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get sessions', error: err.message });
  }
};

// module.exports = {
//   saveDraft,
//   publishSession,
//   getAllSessions // make sure this matches the function name above
// };
