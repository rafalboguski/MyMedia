import { myApp, Models, Repositories, Services, Controllers } from '../App'
import { GenericController, IController } from './Generic.Controller'

import * as angular from 'angular';
import * as _ from 'lodash';


export class StarsController extends GenericController implements IController {

    public stars: Models.Star[];

    static $inject = ['StarsRepository', '$location', 'ShortcutsService'];

    constructor(
        private starsRepository: Repositories.StarsRepository,
        private $location: ng.ILocationService,
        shortcutsService: Services.ShortcutsService
    ) {
        super(shortcutsService);
        this.init();
    }

    init() {
        this.getStars();
    }

    getStars() {
        this.starsRepository.getStars().then(stars => {
            this.stars = stars
        });
    }

    // ---------------------------------------------------------
    shortcuts = [
        { // CTRL + A - Add star
            modyfier: 'ctrl',
            key: 65,
            action: () => {
                this.$location.path('/star/null');
            }
        },
    ]
}
