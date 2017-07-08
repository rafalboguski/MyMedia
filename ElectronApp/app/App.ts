import * as $ from 'jquery';
import * as _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';
import * as Tether from 'tether';
import * as angular from 'angular';
import { module } from 'angular';
import { remote } from 'electron';

import * as bootstrap from 'bootstrap';
(window as any).$ = require('jquery');
require('angular-route');
require('angular-animate');
require('angular-sanitize');
require('angular-files-drop');
require('ng-tags-input');
require('../../node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js');

require('./contextMenu.js');

import * as Models from './Models/_models';
import * as Dto from './Dto/_dto';
import * as Repositories from './Repositories/_repositories';
import * as Services from './Services/_services';
import * as Controllers from './Controllers/_controllers';
import * as Directives from './Directives/_directives';

export { Models, Dto, Repositories, Services, Controllers }

export let myApp = module('myApp', [
    'ngRoute',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap',
    'angular-files-drop',
    'ngTagsInput'
])
    .config(['$routeProvider', $routeProvider => {
        $routeProvider
            //Stars
            .when('/stars', {
                templateUrl: './app/Views/stars.html',
                controller: Controllers.StarsController,
                controllerAs: 'Ctrl'
            })
            .when('/star/:starId', {
                templateUrl: './app/Views/star.html',
                controller: Controllers.StarController,
                controllerAs: 'Ctrl'
            })
            // Datafeeds
            .when('/datafeeds', {
                templateUrl: './app/Views/datafeeds.html',
                controller: Controllers.DatafeedsController,
                controllerAs: 'Ctrl'
            })
            .when('/datafeed/:datafeedId', {
                templateUrl: './app/Views/datafeed.html',
                controller: Controllers.DatafeedController,
                controllerAs: 'Ctrl'
            })
            // Keywords
            .when('/keywords', {
                templateUrl: './app/Views/keywords.html',
                controller: Controllers.KeywordsController,
                controllerAs: 'Ctrl'
            })
            // Settings
            .when('/settings', {
                templateUrl: './app/Views/settings.html',
                controller: Controllers.SettingsController,
                controllerAs: 'Ctrl'
            })
            .otherwise({
                redirectTo: '/stars'
            });
    }]);


myApp.service('GenericRepository', Repositories.GenericRepository);
myApp.service('DatafeedsRepository', Repositories.DatafeedsRepository);
myApp.service('DatasourcesRepository', Repositories.DatasourcesRepository);
myApp.service('KeywordsRepository', Repositories.KeywordsRepository);
myApp.service('SettingsRepository', Repositories.SettingsRepository);
myApp.service('StarsRepository', Repositories.StarsRepository);

myApp.service('AlertsService', Services.AlertsService);
myApp.service('DialogsService', Services.DialogsService);
myApp.service('PopoversService', Services.PopoversService);
myApp.service('ShortcutsService', Services.ShortcutsService);
myApp.service('UtilsService', Services.UtilsService);

myApp.controller('DatafeedController', Controllers.DatafeedController);
myApp.controller('datafeedsController', Controllers.DatafeedsController);
myApp.controller('KeywordsController', Controllers.KeywordsController);
myApp.controller('MainController', Controllers.MainController);
myApp.controller('SettingsController', Controllers.SettingsController);
myApp.controller('StarController', Controllers.StarController);
myApp.controller('StarsController', Controllers.StarsController);


myApp.directive('thExtended', [Directives.TableHeaderDirective.factory()]);






