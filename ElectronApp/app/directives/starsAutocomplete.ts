class StarsAutocompleteDirective implements ng.IDirective {

    restrict = 'EA';
    scope = {
        //@ reads the attribute value, = provides two-way binding, & works with functions
        ids: '=',
        max: '@'
    };
    templateUrl = 'app/directives/starsAutocomplete.html';

    constructor(private starsService: StarsService) {
    }

    link = ($scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => {

        $scope.maxa = parseInt($scope.max);
        $scope.load = ($query) => {
            return this.starsService.getStars().then(result => {
                return _.filter<any>(result.items, star => {
                    if (star.name)
                        return star.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
                });
            });

        };
        $scope.stars = [];

        $scope.$watchCollection('stars', (newValue, oldValue) => {
            $scope.ids = _.map<any, any>(newValue, '_id');
        });

        $scope.$watchCollection('ids', (newValue, oldValue) => {
            if (!$scope.initialized && $scope.ids && newValue !== oldValue)
                this.starsService.getStars({ _id: { $in: $scope.ids } }).then(result => {
                    $scope.stars = result.items;
                    $scope.initialized = true;
                    $scope.$apply();
                })
        });

        $scope.i = 0;

        $scope.elClick = () => {
            element.find('auto-complete').css('display', 'none');

            if ($scope.i === 0) {
                $scope.i++;
                element.find('.tags').click(function () {
                    $('auto-complete').css('display', 'block');
                })
            }

        };

    }

    static factory(): ng.IDirectiveFactory {
        const directive = (starsService: StarsService) => new StarsAutocompleteDirective(starsService);
        directive.$inject = ['StarsService'];
        return directive;
    }
}

angular.module('myApp').directive('starsAutocomplete', ['StarsService', StarsAutocompleteDirective.factory()]);