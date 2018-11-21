import angular from 'angular';
import mainCtrl from './controllers/mainCtrl';
import Router from './config/router';
import '@uirouter/angularjs';
import 'bulma';
import 'satellizer';
import './scss/main.scss';
import '../public/style.css';

angular.module('Events', ['ui.router', 'satellizer'])
  .controller('mainCtrl', mainCtrl)
  .config(Router)
  .config(function($authProvider){
    $authProvider.signupUrl = '/api/register';
    $authProvider.loginUrl = '/api/login';
  });
