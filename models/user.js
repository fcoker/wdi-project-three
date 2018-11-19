const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  friends: [{
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    status: {type: String, default: 'Pending'}
  }]
});

userSchema.pre('save', function() {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 8);
  }
});

userSchema.methods.validatePassword = function(attemptedPassword) {
  return bcrypt.compareSync(attemptedPassword, this.password);
};

userSchema.virtual('eventsCreated', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'createdBy'
});

userSchema.virtual('friendsList', {
  ref: 'User',
  localField: '_id',
  foreignField: 'friends.userId'
});

userSchema.set('toJSON', {
  virtuals: true
});

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
