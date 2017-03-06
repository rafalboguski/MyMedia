angular.module('myApp')
    .service('myModalService', ['$rootScope', '$location', 'alertsService', '$q', 'genericService', 'ModalService',
        function ($rootScope, $location, alertsService, $q, genericService, ModalService) {


            this.DataFeed = function (modal_data, callback) {
                ModalService.showModal({
                    templateUrl: "app/views/modals/datafeed.html",
                    controller: "datafeedController",
                    inputs: {
                        data: modal_data
                    }
                }).then(function (modal) {
                    modal.element.modal();
                    modal.element.on('hidden.bs.modal', function () { callback(null); });
                    modal.close.then(function (result) { callback(result); });
                });
            };

            this.openStar = function (modal_data, callback) {
                ModalService.showModal({
                    templateUrl: "app/views/modals/star.html",
                    controller: "starController",
                    inputs: {
                        data: modal_data
                    }
                }).then(function (modal) {
                    modal.element.modal();
                    modal.element.on('hidden.bs.modal', function () {
                        debugger;
                        callback(null)
                    });
                    return modal.close.then(function (result) {
                        debugger;
                        callback(result);
                    });
                });
            };

        }]);
