/* global api, expect, describe, it, beforeEach */

const Event = require('../../models/event');

const userIds =[
  '5beedae9af125745622b702e',
  '5beedaebaf125745622b702f',
  '5beedaecaf125745622b7030'
];

const eventData = [
  {
    name: 'Craig Richards, Fabric NightClub',
    location: 'Fabric, 77A Charterhouse St, Clerkenwell, London EC1M 6HJ',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn8oEU0paXjgIskQgVzgtEPXexaulJQYTynFERr61TQITbWw30gA',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: '17th November',
    time: '11:00pm — 7:00am',
    comments: [],
    createdBy: userIds[0]
  }
];

let eventId;

describe('Events SHOW', () => {

  beforeEach(done => {
    Event.remove({})
      .then(() => Event.create(eventData))
      .then(event => {
        eventId = event[0]._id;
        done();
      });
  });

  it('should return a 200 response', done => {
    api.get(`/api/events/${eventId}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.get(`/api/events/${eventId}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.get(`/api/events/${eventId}`)
      .end((err, res) => {
        expect(res.body.name).to.eq(eventData[0].name);
        expect(res.body.imageUrl).to.eq(eventData[0].imageUrl);
        expect(res.body.description).to.eq(eventData[0].description);
        expect(res.body.date).to.eq(eventData[0].date);
        expect(res.body.time).to.eq(eventData[0].time);
        done();
      });
  });

});
