var myApp = angular.module('myApp', ['ngRoute', 'routeConfig', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);

var routeConfig = angular.module('routeConfig', []);

routeConfig.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.
      when('/stars', {
        templateUrl: './app/views/stars.html',
        controller: 'starsController'
      }).
      when('/items', {
        templateUrl: './app/views/items.html',
        controller: 'itemsController'
      }).
      when('/settings', {
        templateUrl: './app/views/settings.html',
        controller: 'settingsController'
      }).
      otherwise({
        redirectTo: '/stars'
      });
  }]);
