const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  name: {type: String, required: true},
  location: {type: String, required: true},
  imageUrl: {type: String, required: true},
  description: String,
  date: {type: String, required: true},
  time: String,
  comments: [
    {
      text: String,
      user: { type: mongoose.Schema.ObjectId, ref: 'User' }
    }
  ],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
});

const eventModel = mongoose.model('Event', eventSchema);
module.exports = eventModel;
