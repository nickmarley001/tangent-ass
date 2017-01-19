'use strict';

/**
 * @ngdoc overview
 * @name tangentAssApp
 * @description
 * # tangentAssApp
 *
 * Main module of the application.
 */


angular
  .module('tangentAssApp', [
    'ngAnimate',
    'tangentAssApp.controllers',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
