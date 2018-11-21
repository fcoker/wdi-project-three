import eventIndexCtrl from '../controllers/events/indexCtrl';
import eventShowCtrl from '../controllers/events/showCtrl';
import eventCreateCtrl from '../controllers/events/newCtrl';
import eventUpdateCtrl from '../controllers/events/editCtrl';
import userLoginCtrl from '../controllers/auth/loginCtrl';
import userRegisterCtrl from '../controllers/auth/registerCtrl';
import userShowCtrl from '../controllers/users/showCtrl';
import userEditCtrl from '../controllers/users/editCtrl';

function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      templateUrl: './views/home.html',
      url: '/'
    })
    .state('login', {
      templateUrl: './views/auth/login.html',
      url: '/login',
      controller: userLoginCtrl
    })
    .state('register', {
      templateUrl: './views/auth/register.html',
      url: '/register',
      controller: userRegisterCtrl
    })
    .state('eventsIndex', {
      templateUrl: './views/events/eventIndex.html',
      url: '/events',
      controller: eventIndexCtrl
    })
    .state('eventShow', {
      templateUrl: './views/events/eventShow.html',
      url: '/events/:eventId',
      controller: eventShowCtrl
    })
    .state('eventCreate', {
      templateUrl: './views/events/eventNew.html',
      url: '/events/new',
      controller: eventCreateCtrl
    })
    .state('eventUpdate', {
      templateUrl: './views/events/eventEdit.html',
      url: '/events/:eventId/edit',
      controller: eventUpdateCtrl
    })
    .state('userShow', {
      templateUrl: './views/users/userShow.html',
      url: '/users/:userId',
      controller: userShowCtrl
    })
    .state('userEdit', {
      templateUrl: './views/users/userEdit.html',
      url: '/users/:userId/edit',
      controller: userEditCtrl
    });
  $urlRouterProvider.otherwise('/');
}

export default Router;
