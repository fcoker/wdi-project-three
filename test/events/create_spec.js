/* global describe, it, expect, api, beforeEach */

const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const env = require('../../config/environment');

const Event = require('../../models/event');

const userIds =[
  '5beedae9af125745622b702e'
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

let token;

describe('Events CREATE', () => {

  beforeEach(done => {
    Event.remove({})
      .then(() => User.remove({}))
      .then(() => User.create({
        email: 'test',
        username: 'test',
        password: 'test'
      }))
      .then(user => {
        token = jwt.sign({ sub: user._id }, env.secret, { expiresIn: '6h' });
        done();
      });
  });

  it('should return a 401 response without a token', done => {
    api.post('/api/events')
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 201 response', done => {
    api.post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send(eventData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return an object', done => {
    api.post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send(eventData)
      .end((err, res) => {
        expect(res).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .send(eventData)
      .end((err, res) => {
        expect(res.body.name).to.eq(eventData.name);
        expect(res.body.imageUrl).to.eq(eventData.imageUrl);
        expect(res.body.location).to.eq(eventData.location);
        expect(res.body.description).to.eq(eventData.description);
        expect(res.body.date).to.eq(eventData.date);
        expect(res.body.time).to.eq(eventData.time);
        done();
      });
  });
});
