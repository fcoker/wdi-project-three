const env = require('../config/environment');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

function login(req, res, next) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user && user.validatePassword(req.body.password)) {
        const token = jwt.sign({
          username: user.username,
          sub: user._id
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
  User.create(req.body)
    .then(user => res.json({
      message: `${user.username} is now registered`
    }))
    .catch(next);
}

module.exports = {
  login: login,
  register: register
};
