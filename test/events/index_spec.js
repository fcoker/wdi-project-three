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
  },
  {
    name: 'Craig Richards, Fabric NightClub 2',
    location: 'Fabric, 77A Charterhouse St, Clerkenwell, London EC1M 6HJ',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn8oEU0paXjgIskQgVzgtEPXexaulJQYTynFERr61TQITbWw30gA',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: '19th November',
    time: '11:00pm — 7:00am',
    comments: [],
    createdBy: userIds[1]
  }
];

describe('Events INDEX', () => {

  beforeEach(done => {
    Event.remove({})
      .then(() => Event.create(eventData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api.get('/api/events')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an array', done => {
    api.get('/api/events')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return an array of objects', done => {
    api.get('/api/events')
      .end((err, res) => {
        res.body.forEach(item => expect(item).to.be.an('object'));
        done();
      });
  });

  it('should return the correct data', done => {
    api.get('/api/events')
      .end((err, res) => {
        res.body.forEach(event => {
          const dataItem = eventData.find(item => item.name === event.name);
          expect(event.name).to.eq(dataItem.name);
          expect(event.location).to.eq(dataItem.location);
          expect(event.imageUrl).to.eq(dataItem.imageUrl);
          expect(event.description).to.eq(dataItem.description);
          expect(event.date).to.eq(dataItem.date);
          expect(event.time).to.eq(dataItem.time);
        });
        done();
      });
  });

});
