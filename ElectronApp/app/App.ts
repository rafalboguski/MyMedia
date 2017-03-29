declare var $: JQueryStatic; $ = (<any>window).$ = require('jquery');
declare var jQuery: JQueryStatic; jQuery = (<any>window).jQuery = require('jquery');
declare var fs; fs = require('fs');
declare var path; path = require('path');
declare var Tether; Tether = require('tether');
declare var remote; remote = require('electron').remote;
declare var fs; fs = require('fs');

require('bootstrap');
require("angular");
require('angular-route');
require('angular-animate');
require('angular-sanitize');
require('angular-files-drop');
require('angular-modal-service');
require('ng-tags-input');
require('../../node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js');
require('../renderer.js');
require('./contextMenu.js');

(<any>window)._ = require('lodash');
require('lodash');

declare var $apply; $apply = function (scope: ng.IScope) {
    _.defer(function () {
        scope.$apply();
    });
};

// Dialogs
// https://github.com/electron/electron/blob/master/docs/api/dialog.md
declare var dialog; dialog = {

    selectFileDialog: function (callback, filters) {
        remote.dialog.showOpenDialog(
            {
                title: "Select file",
                properties: ['openFile'],
                filters: filters
            },
            callback
        );
    },
    selectFilesDialog: function (callback, filters) {
        remote.dialog.showOpenDialog(
            {
                title: "Select files",
                properties: ['openFile', 'multiSelections'],
                filters: filters
            },
            callback
        );
    },
    selectFolderDialog: function (callback, filters) {
        remote.dialog.showOpenDialog(
            {
                title: "Select folder",
                properties: ['openDirectory'],
                filters: filters
            },
            callback
        );
    },
    selectFoldersDialog: function (callback, filters) {
        remote.dialog.showOpenDialog(
            {
                title: "Select folders",
                properties: ['openDirectory', 'multiSelections'],
                filters: filters
            },
            callback
        );
    }

};

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
