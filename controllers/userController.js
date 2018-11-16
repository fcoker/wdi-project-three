const User = require('../models/user');

function showRoute(req, res, next) {
  User.findById(req.params.userId)
    .populate('eventsCreated')
    .select('-password')
    .then(user => {
      res.json(user);
    })
    .catch(next);
}

module.exports = {
  show: showRoute
};
