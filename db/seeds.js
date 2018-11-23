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
    name: 'Craig Richards, Fabric Night Club',
    location: '77A Charterhouse St, Clerkenwell, London EC1M 6HJ',
    imageUrl: 'https://images1.miaminewtimes.com/imager/u/original/10218536/heart-nightclub-credit-karli_evans.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: '17 November 2018, 12:00',
    dateTo: '26 November 2018, 14:00',
    comments: [],
    createdBy: userIds[0]
  },
  {
    name: 'Afro Jack, Ministry Of Sound',
    location: '103 Gaunt St, London SE1 6DP',
    imageUrl: 'http://www.ministryofsoundclub.com.au/media/1674/hr_mos-17-6-17-1.jpg?anchor=center&mode=crop&width=1140&height=854&rnd=131433605600000000',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: '30 November 2018, 22:00',
    dateTo: '1 December 2018, 06:00',
    comments: [],
    createdBy: userIds[1]
  },
  {
    name: 'Cirque Du Soleil Totem',
    location: 'Kensington Gore, London SW7 2AP',
    imageUrl: 'https://d15v4l58k2n80w.cloudfront.net/file/1396975600/48845645457/width=1280/height=720/format=-1/fit=crop/rev=2/t=424522/e=never/k=c68ea083/TO002-TOTEM_133x216_AW1.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: '1 December 2018, 20:00',
    dateTo: '1 December 2018, 22:30',
    comments: [],
    createdBy: userIds[2]
  },
  {
    name: 'The Book Of Mormon',
    location: 'Coventry Street London, W1D 6AS',
    imageUrl: 'http://bookofmormonbroadway.com/images/bom-og.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: '21 November 2018, 20:00',
    dateTo: '21 November 2018, 22:30',
    comments: [],
    createdBy: userIds[2]
  },
  {
    name: 'Paint Balling: Diamond Wars',
    location: 'Bassetts Pole, Birmingham',
    imageUrl: 'http://www.bzpaintball.co.uk/wp/wp-content/uploads/2018/01/BZ-Paintball-26-11-2016-51.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: '30 December 2018, 12:00',
    dateTo: '30 December 2018, 15.00',
    comments: [],
    createdBy: userIds[0]
  },
  {
    name: 'The Big Shoot - Clay Shooting',
    location: 'Rowley Green, Rowley Ln, Barnet EN5 3HW',
    imageUrl: 'https://www.cpsa.co.uk/userfiles/images/Game%20Fair%20Shooting%20Pic.JPG',
    description: 'The Big Shoot clay pigeon shooting network was established in 2004 in order to provide UK and Irish clay shooting venues with a smart and cohesive platform from which to promote the exciting leisure pursuit of clay pigeon shooting.',
    date: '1 March 2019, 12:00',
    dateTo: '1 March 2019, 14.00',
    comments: [],
    createdBy: userIds[1]
  },
  {
    name: 'Rock Climbing - The Arch Climbing Wall',
    location: 'Drummond Rd, London SE16',
    imageUrl: 'https://assets.londonist.com/uploads/2014/03/i875/the-arch.png',
    description: 'The Arch is a three-venue bouldering centre. The original 10,000 square feet bouldering wall opened at The Biscuit Factory in Bermondsey, but since then it has expanded with a second venue (a flagship with over 11,000 square feet) within the same Bermondsey complex, plus a further 11,000 square feet site in north London. Routes are graded from V0 (easiest) to V9 (hardest) with around 300-400 different routes to attempt at each venue. There are 200+ new routes set every week, so the regulars don’t get bored. There are also campus boards, rings, training areas and a project board where you can set your own routes. Cafes at each location provide snacks and hot drinks to see you on your merry way.',
    date: '29 December 2018, 13:00',
    dateTo: '29 December 2018, 15.00',
    comments: [],
    createdBy: userIds[2]
  },
  {
    name: 'Snorkel with Sharks - London Aquarium ',
    location: 'County Hall, Westminster Bridge Rd, Lambeth, London SE1 7PB',
    imageUrl: 'https://www.telegraph.co.uk/content/dam/Travel/leadAssets/32/29/shark_swimming_3229686a.jpg?imwidth=450',
    description: 'The new evening experience, with limited slots offered on 27, 28, 29, 30 and 31 October ONLY, will see participants submerged beneath the water in a specially designed mesh enclosure, equipped with explorer-style red light torches to spot over 15 magnificent sharks in the eerie darkness. No diving experience is required. There is no minimum age requirement for participation in the experience but each participant in the experience must be 1.3 meters tall or taller.',
    date: '20 December 2018, 19:00',
    dateTo: '20 December 2018, 21.00',
    comments: [],
    createdBy: userIds[1]
  },
  {
    name: 'Go Karting - Lakeside Circuit ',
    location: 'Arterial Rd, Purfleet',
    imageUrl: 'https://www.team-sport.co.uk/media/3023/teamsport_main_header_go_karting_london_docklands_1920x1090-min.jpg',
    description: 'The perfect karting session for all abilities, with different sessions for beginners and advanced drivers this format is perfect for you to get some laps in. Excitement is guaranteed whether you are racing in our Family Fun Sessions which are set to the same speed as indoor kart circuits or if you fancy something more punchy like our unique 390cc, 70mph Sodi Race kart. These 15 minute time trial sessions are great for individuals or groups wanting to battle it out on our 925m International Circuit. Do not forget to collect your detailed laptime printout afterwards to see just how quick you were.',
    date: '2 January 2019, 19:00',
    dateTo: '2 January 2019, 21.00',
    comments: [],
    createdBy: userIds[0]
  },
  {
    name: 'Lunch at Busaba - Busaba Covent Garden',
    location: '44 Floral St, Covent Garden, London WC2E 9DA',
    imageUrl: 'https://www.venuescape.my/images/venue/venue-busaba-thai-sunway-restaurant-events-wedding-corporate-networking-birthday-anniversary-romantic-private-room-party-meeting_31486440005.jpg',
    description: 'The perfect karting session for all abilities, with different sessions for beginners and advanced drivers this format is perfect for you to get some laps in. Excitement is guaranteed whether you are racing in our Family Fun Sessions which are set to the same speed as indoor kart circuits or if you fancy something more punchy like our unique 390cc, 70mph Sodi Race kart. These 15 minute time trial sessions are great for individuals or groups wanting to battle it out on our 925m International Circuit. Do not forget to collect your detailed laptime printout afterwards to see just how quick you were.',
    date: '2 January 2019, 19:00',
    dateTo: '2 January 2019, 21.00',
    comments: [],
    createdBy: userIds[0]
  }

];


const userData = [
  {
    _id: userIds[0],
    username: 'sham',
    email: 'sham@sham',
    password: 'pass',
    profilePic: 'https://i.imgur.com/jkz2QEO.jpg'
  }, {
    _id: userIds[1],
    username: 'Grant',
    email: 'grant@grant',
    password: 'pass',
    profilePic: 'http://www.stickpng.com/assets/images/585e4beacb11b227491c3399.png'
  }, {
    _id: userIds[2],
    username: 'Rob',
    email: 'rob@rob',
    password: 'pass',
    profilePic: 'http://www.stickpng.com/assets/images/585e4beacb11b227491c3399.png'
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
