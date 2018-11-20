const mongoose = require('mongoose');
const env = require('../config/environment');
const Event = require('../models/event');
const User = require('../models/user');
mongoose.connect(env.dbUri);

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


const userData = [
  {
    _id: userIds[0],
    username: 'sham',
    email: 'sham@sham',
    password: 'pass'
  }, {
    _id: userIds[1],
    username: 'Grant',
    email: 'grant@grant',
    password: 'pass'
  }, {
    _id: userIds[2],
    username: 'Rob',
    email: 'rob@rob',
    password: 'pass'
  }
];

Event.collection.drop();
User.collection.drop();

Event.create(eventData)
  .then(events => {
    console.log(`Created ${events.length} events`);
    User.create(userData)
      .then(users => {
        console.log(`Created ${users.length} users`);
        mongoose.connection.close();
      });
  });
