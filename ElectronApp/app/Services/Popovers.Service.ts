import { myApp, Models } from '../App'


export class PopoversService {

    constructor(
        private $sce: ng.ISCEService
    ) {

    }

    getStarImagePopover(star: Models.Star, scope) {

        if (!scope.popovers) {
            scope.popovers = {};
        }

        // if (star && star.coverFullPath && scope) {
        if (star && scope) {
            // scope.popovers.starImage = this.$sce.trustAsHtml("<div style=\"width:200px; height:200px;\"><div class=\"crop\" style=\"background-image: url('" + star.coverFullPath + "');\"></div></div>")
        }
        else {
            scope.popovers.starImage = '';
        }
    }
}
