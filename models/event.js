const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  name: {type: String, required: true},
  location: {type: String, required: true},
  imageUrl: {type: String, required: true},
  description: String,
  date: {type: String, required: true},
  dateTo: String,
  comments: [
    {
      text: String,
      user: { type: mongoose.Schema.ObjectId, ref: 'User' }
    }
  ],
  attendees: [
    {
      attendee: { type: mongoose.Schema.ObjectId, ref: 'User' }
    }
  ],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

eventSchema.virtual('numberOfAttendees')
  .get(function() {
    return this.attendees.length;
  });

eventSchema.set('toJSON', {
  virtuals: true
});

const eventModel = mongoose.model('Event', eventSchema);
module.exports = eventModel;
