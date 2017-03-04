angular.module('myApp')
    .service('datafeedsService', ['$rootScope', '$location', 'alertsService', 'genericService',
        function ($rootScope, $location, alertsService, genericService) {

            var collectionName = 'datafeeds';

            // run after fetching from db
            this.build = function (model) {

                model = genericService.build(model, {
                    properties: {
                        _id: null,
                        name: null
                    },
                    tmp: {
                    },
                    functions: {

                    }
                });

                return model;
            };

            // run before saving in db
            this.clean = function (model) {
                genericService.clean(model);
            };

            // Get
            this.getDatafeed = function (id) {
                return genericService.single(collectionName, id, this.build);
            };

            this.getDatafeeds = function () {
                return genericService.many(collectionName, {}, this.build);
            };

            // Set
            this.addDatafeed = function (model) {
                return genericService.add(collectionName, model);
            };

            this.saveDatafeed = function (model) {
                return genericService.save(collectionName, model);
            };

            // Remove
            this.removeDatafeed = function (star, callback) {
                mongo(function (db) {
                    var collection = db.collection('stars');

                    collection.deleteOne({ _id: star._id }, function (err, result) {
                        db.close()

                        if (angular.isFunction(callback))
                            callback(result);
                    });
                });
            };


        }]);


