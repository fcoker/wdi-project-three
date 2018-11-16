const Event = require('../models/event');

function createRoute(req, res, next) {
  Event.findById(req.params.eventId)
    .then(event => {
      req.body.user = req.tokenUserId;
      event.comments.push(req.body);
      return event.save();
    })
    .then(event => Event.populate(event, 'createdBy comments.user'))
    .then(event => res.json(event))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Event.findById(req.params.eventId)
    .then(event => {
      const comment = event.comments.id(req.params.commentId);
      comment.remove();
      return event.save();
    })
    .then(event => Event.populate(event, 'createdBy comments.user'))
    .then(event => res.json(event))
    .catch(next);
}

module.exports = {
  create: createRoute,
  delete: deleteRoute
};
