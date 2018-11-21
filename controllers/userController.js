const User = require('../models/user');

function showRoute(req, res, next) {
  User.findById(req.params.userId)
    .populate('eventsCreated eventsAttending friendsList')
    .select('-password')
    .then(user => {
      res.json(user);
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  User.findById(req.params.userId)
    .then(user => user.set(req.body))
    .then(user => user.save())
    .then(user => res.json(user))
    .catch(next);
}

module.exports = {
  show: showRoute,
  edit: updateRoute
};
