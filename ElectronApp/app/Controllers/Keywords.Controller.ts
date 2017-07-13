import { myApp, Models, Dto, Repositories, Services, Controllers } from '../App'
import { GenericController, IController } from './Generic.Controller'

import * as angular from 'angular';
import * as $ from 'jquery';
import * as _ from 'lodash';

export class KeywordsController extends GenericController implements IController {

    private view: string;

    // value in search/add bar
    private value: string = '';
    private valueMultiple: string = '';

    private keywordFilter: Models.KeywordFilter = new Models.KeywordFilter();
    private keywords: Models.Keyword[] = [];

    private multipleCollapsed: boolean = true;

    static $inject = ['$scope', '$routeParams', '$location', '$q', 'AlertsService', 'KeywordsRepository', 'ShortcutsService'];

    constructor(
        private $scope: ng.IScope,
        private $routeParams,
        private $location: ng.ILocationService,
        private $q: ng.IQService,
        private _alertsService: Services.AlertsService,
        private _keywordsRepository: Repositories.KeywordsRepository,
        shortcutsService: Services.ShortcutsService
    ) {
        super(shortcutsService);
        this.init()
            .then(() => { return this.$q((resolve, reject) => { setTimeout(() => { resolve() }, 1); }) })
            .then(() => { this.initialized = true });
    }

    // --------------------------------------------------------------------------------------------------

    init(): Promise<any> {
        return this.getKeywords()
            .then(() => {
                // set watches
                this.$scope.$watch('Ctrl.value', (newValue: string) => {
                    this.keywordFilter.exact.value = newValue;
                    this.keywordFilter.pagination.page = 1;
                    this.getKeywords()
                });
            })
    }

    getKeywords(): Promise<Models.Keyword[]> {
        return this._keywordsRepository.getKeywords(this.keywordFilter)
            .then((keywords) => {
                return this.keywords = keywords;
            });
    }

    addKeyword() {
        this._alertsService.confirm("Add keyword").then(data => {
            if (data) {
                // create single
                if (this.multipleCollapsed) {
                    this._keywordsRepository
                        .create(new Models.Keyword(this.value))
                        .then((data) => {
                            this.getKeywords().then(() => {
                                this.value = '';
                                $('.keywords-view #search-input').focus();
                                this._alertsService.toastSuccess('keyword created');
                            });
                        })
                        .catch((error) => {
                            this._alertsService.error(error.message);
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
                                this._alertsService.error('Only ' + data.created.length + ' created, ' + data.failed.length + ' failed');
                                this.valueMultiple = '__Created___________________';
                                for (let created of data.created) {
                                    this.valueMultiple += '\n' + created.value;
                                }

                                this.valueMultiple += '\n\n__Failed___________________';
                                for (let failed of data.failed) {
                                    this.valueMultiple += '\n' + failed.value;
                                } 
                            } else {
                                this._alertsService.success('All ' + data.created.length + 'created');
                                this.valueMultiple = '';
                            }
                        });
                }
            }
        });
    }

    deleteKeyword(keyword) {
        this._keywordsRepository.delete(keyword.id)
            .then(() => {
                this.keywords.splice(this.keywords.indexOf(keyword), 1);
                this._alertsService.toastSuccess('keyword deleted');
            })
    }

    copyText(text) {
        require('electron').clipboard.writeText(text, 'selection');
    }

    // Routing ------------------------------------------------------------------------------------------
    getRouteParams() {
        this.view = 'List';
    };

    shortcuts = [
        // CTRL + S - add new keyword from search/add box value
        { modyfier: 'ctrl', key: 83, action: () => { this.addKeyword() } },
        // CTRL + F - focus on search/add box 
        { modyfier: 'ctrl', key: 70, action: () => { $('.keywords-view #search-input').focus(); } },
    ];
}
