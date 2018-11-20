const Event = require('../models/event');

function indexRoute(req, res, next) {
  Event.find().then(events => res.json(events))
    .catch(next);
}

function showRoute(req, res, next) {
  Event.findById(req.params.eventId)
    .populate('createdBy comments.user attendees.attendee')
    .then(event => res.json(event))
    .catch(next);
}

function createRoute(req, res, next) {
  req.body.createdBy = req.tokenUserId;
  Event.create(req.body)
    .then(event => res.status(201).json(event))
    .catch(next);
}

function updateRoute(req, res, next) {
  Event.findById(req.params.eventId)
    .then(event => event.set(req.body))
    .then(event => event.save())
    .then(event => res.json(event))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Event.findByIdAndDelete(req.params.eventId)
    .then(() => res.sendStatus(204))
    .catch(next);
}

function addAttendee(req, res, next) {
  Event.findById(req.params.eventId)
    .then(event => {
      req.body.user = req.tokenUserId;
      Event.populate(event, 'attendees.attendee');
      event.attendees.push({attendee: req.body.user});
      console.log(req.body);
      return event.save();
    })
    .then(event => res.json(event))
    .catch(next);
}


module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute,
  add: addAttendee
};
