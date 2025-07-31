//This model will let users: 1)Create Sessions 2)Save them as draft or publish 3)Attach title, tags, and a JSON file URL
// models/Session.js
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  user_id: {//important sections as it links each session to its specific user
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  tags: [String], // stored as ["yoga", "meditation"]
  json_file_url: {
    type: String,
    required: true,
  },
  status: {//imp section as it lets us distinguish between draft and published sessions
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Session', sessionSchema);