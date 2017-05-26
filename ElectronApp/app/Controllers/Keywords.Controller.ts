import { myApp, Models, Dto, Repositories, Services, Controllers } from '../App'
import { GenericController, IController } from './Generic.Controller'

import * as angular from 'angular';

export class KeywordsController extends GenericController implements IController {

    private view: string;
    private keywords: Models.Keyword[];

    static $inject = ['$routeParams', '$location', '$q', 'KeywordsRepository', 'ShortcutsService'];

    constructor(
        private $routeParams,
        private $location: ng.ILocationService,
        private $q: ng.IQService,
        private _keywordsRepository: Repositories.KeywordsRepository,
        shortcutsService: Services.ShortcutsService
    ) {
        super(shortcutsService);
        this.init();
    }

    init() {
        this.getKeywords();
    }

    getKeywords() {
        this._keywordsRepository.getAll()
            .then((keywords) => {
                this.keywords = keywords;
            });
    }

    addKeyword(value: string) {
        this._keywordsRepository
            .insert(new Models.Keyword(value))
            .then((data) => {
                this.getKeywords();
            });

    }

    // Routing  
    getRouteParams() {
        this.view = 'List';
    };

    shortcuts = [
        { // CTRL + A - add datafeed
            modyfier: 'ctrl',
            key: 65,
            action: () => {
                this.$location.path('/datafeed/null');
            }
        },
    ];
}
