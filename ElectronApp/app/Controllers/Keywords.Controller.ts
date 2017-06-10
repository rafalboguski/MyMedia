import { myApp, Models, Dto, Repositories, Services, Controllers } from '../App'
import { GenericController, IController } from './Generic.Controller'

import * as angular from 'angular';
import * as $ from 'jquery';
import * as _ from 'lodash';

export class KeywordsController extends GenericController implements IController {

    private view: string;
    private value: string = '';
    private valueMultiple: string = '';
    private keywords: Models.Keyword[] = [];

    private multipleCollapsed: boolean = true;

    static $inject = ['$scope', '$routeParams', '$location', '$q', 'AlertsService', 'KeywordsRepository', 'ShortcutsService'];

    constructor(
        private $scope: ng.IScope,
        private $routeParams,
        private $location: ng.ILocationService,
        private $q: ng.IQService,
        private AlertsService: Services.AlertsService,
        private _keywordsRepository: Repositories.KeywordsRepository,
        shortcutsService: Services.ShortcutsService
    ) {
        super(shortcutsService);
        this.init()
            .then(() => { return this.$q((r, rr) => { setTimeout(() => { r() }, 1); }) })
            .then(() => { this.initialized = true });
    }

    init(): Promise<any> {
        return this.search(this.value)
            .then(() => {
                // set watches
                this.$scope.$watch('Ctrl.value', (newValue: string) => {
                    this.search(newValue)
                });
            })
    }

    search(valaue: string = null): Promise<Models.Keyword[]> {
        return this._keywordsRepository.search(valaue)
            .then((keywords) => {
                return this.keywords = keywords;
            });
    }

    addKeyword() {
        this.AlertsService.confirm("Add keyword").then(data => {
            if (data) {
                // create cingle
                if (this.multipleCollapsed) {
                    this._keywordsRepository
                        .create(new Models.Keyword(this.value))
                        .then((data) => {
                            this.search(this.value).then(() => {
                                this.value = '';
                                $('.keywords-view #search-input').focus();
                            });
                        })
                        .catch((error) => {
                            this.AlertsService.error(error.message);
                        });
                }
                // create many
                else {
                    let lines = this.valueMultiple.split('\n');
                    let keywords = _.map(lines, (x) => {
                        return new Models.Keyword(x);
                    }).filter((x) => { if ($.trim(x.value) != '') return x });

                    this._keywordsRepository.createMany(keywords)
                        .then(data => {
                            if (data.failed.length > 0) {
                                this.AlertsService.error('Only ' + data.created.length + ' created, ' + data.failed.length + ' failed');
                                this.valueMultiple = '__Created___________________';
                                for (let created of data.created) {
                                    this.valueMultiple += '\n' + created.value;
                                }

                                this.valueMultiple += '\n\n__Failed___________________';
                                for (let failed of data.failed) {
                                    this.valueMultiple += '\n' + failed.value;
                                }
                            } else {
                                this.AlertsService.success('All ' + data.created.length + 'created');
                                this.valueMultiple = '';
                            }
                        });
                }
            }
        });
    }

    copyText(text) {
        require('electron').clipboard.writeText(text, 'selection');
    }

    // Routing  
    getRouteParams() {
        this.view = 'List';
    };

    shortcuts = [
        // CTRL + A - add new keyword from search/add box value
        { modyfier: 'ctrl', key: 13, action: () => { this.addKeyword() } },
        // CTRL + F - focus on search/add box 
        { modyfier: 'ctrl', key: 70, action: () => { $('.keywords-view #search-input').focus(); } },
    ];
}
