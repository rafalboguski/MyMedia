var myApp = angular.module('myApp', ['ngRoute', 'routeConfig', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'angular-files-drop', 'angularModalService', 'ngTagsInput']);

var routeConfig = angular.module('routeConfig', []);

routeConfig.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/stars', {
                templateUrl: './app/components/stars/stars.html',
                controller: 'starsController'
            }).
            when('/star/:starId', {
                templateUrl: './app/components/stars/star.html',
                controller: 'starController'
            }).
            when('/datafeeds', {
                templateUrl: './app/components/datafeeds/datafeeds.html',
                controller: 'datafeedsController'
            }).
            when('/datafeed/:datafeedId', {
                templateUrl: './app/components/datafeeds/datafeed.html',
                controller: 'datafeedController'
            }).
            when('/settings', {
                templateUrl: './app/components/settings/settings.html',
                controller: 'settingsController'
            }).
            otherwise({
                redirectTo: '/stars'
            });
    }]);

// controllers
require("./components/app/mainController.js")
require("./components/stars/starsController.js")
require("./components/stars/starController.js")
require("./components/datafeeds/datafeedsController.js")
require("./components/datafeeds/datafeedController.js")
require("./components/settings/settingsController.js")

// services
require("./components/app/alertsService.js")
require("./components/app/genericService.js")
require("./components/stars/starsService.js")
require("./components/datafeeds/datafeedsService.js")
require("./components/settings/dataSourcesService.js")
require("./components/settings/settingsService.js")
require("./components/app/utils.js")
require("./components/app/myModalService.js")

// directives
require("./directives/starsAutocomplete.js")
