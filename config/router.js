const router = require('express').Router();
const eventController = require('../controllers/eventController');
const secureRoute = require('../auth/secureRoute');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const commentController = require('../controllers/commentController');

router.route('/register')
  .post(authController.register);

router.route('/login')
  .post(authController.login);

router.route('/events')
  .get(eventController.index)
  .post(secureRoute, eventController.create);

router.route('/events/:eventId')
  .get(eventController.show)
  .put(secureRoute, eventController.update)
  .delete(secureRoute, eventController.delete);

router.route('/events/:eventId/comments')
  .post(secureRoute, commentController.create);

router.route('/events/:eventId/attending')
  .post(secureRoute, eventController.add);

router.route('/events/:eventId/comments/:commentId')
  .delete(secureRoute, commentController.delete);

router.route('/users/:userId')
  .get(userController.show);

module.exports = router;
