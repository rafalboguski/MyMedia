angular.module('myApp')
    .directive('starsAutocomplete', ['starsService',
        function (starsService) {
            return {
                restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
                scope: {
                    //@ reads the attribute value, = provides two-way binding, & works with functions
                    model: '=',
                    max: '@'
                },
                templateUrl: 'app/directives/starsAutocomplete.html',
                link: function ($scope, element, attrs) {

                    $scope.maxa = parseInt($scope.max);
                    $scope.load = function ($query) {
                        return starsService.getStars().then(stars => {
                            return _.filter(stars, star => {
                                if (star.name)
                                    return star.name.toLowerCase().indexOf($query.toLowerCase()) != -1;
                            });
                        });

                    };

                }
            }
        }])
    .directive('enforceMaxTags', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelController) {
                var maxTags = attrs.maxTags ? parseInt(attrs.maxTags, '10') : null;
                ngModelController.$validators.checkLength = function (value) {

                    if (attrs.onlyFromList == 'true') {
                        if (value.length > 0 && !value[value.length - 1]._id) {
                            value.splice(value.length - 1, 1);
                        }
                    }

                    if (value && maxTags && value.length > maxTags) {
                        value.splice(value.length - 2, 1);
                    }
                    return value;
                };
            }
        };
    });