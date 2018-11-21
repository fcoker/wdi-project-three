const env = require('../config/environment');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function login(req, res, next) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user && user.validatePassword(req.body.password)) {
        const token = jwt.sign({
          username: user.username,
          sub: user._id,
          profilePic: user.profilePic
        }, env.secret, { expiresIn: '12h' });
        res.json({
          message: `Welcome back ${user.username}!`,
          token: token
        });
      } else {
        res.status(401).json({
          message: 'Unauthorised'
        });
      }
    })
    .catch(next);
}

function register(req, res, next) {
  //default profilePic link(should try to make it a local file):
  req.body.profilePic = 'http://www.stickpng.com/assets/images/585e4beacb11b227491c3399.png';
  User.create(req.body)
    .then(user => res.json({
      message: `${user.username} is now registered, ${user.profilePic}`
    }))
    .catch(next);
}

module.exports = {
  login: login,
  register: register
};
