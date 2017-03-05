var myApp = angular.module('myApp', ['ngRoute', 'routeConfig', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'angular-files-drop', 'angularModalService', 'ngTagsInput']);

var routeConfig = angular.module('routeConfig', []);

routeConfig.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider.
      // stars
      when('/stars', {
        templateUrl: './app/views/stars.html',
        controller: 'starsController'
      }).
      when('/stars/add', {
        templateUrl: './app/views/star.html',
        controller: 'starController'
      }).
      when('/star/:starId/edit', {
        templateUrl: './app/views/star.html',
        controller: 'starController'
      }).
      // datafeeds
      when('/datafeeds', {
        templateUrl: './app/views/datafeeds.html',
        controller: 'datafeedsController'
      }).
      when('/items', {
        templateUrl: './app/views/items.html',
        controller: 'itemsController'
      }).
      when('/settings', {
        templateUrl: './app/views/settings.html',
        controller: 'settingsController'
      }).
      when('/test', {
        templateUrl: './app/views/test.html',
        controller: 'testController'
      }).
      otherwise({
        redirectTo: '/stars'
      });
  }]);
