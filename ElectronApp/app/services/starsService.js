angular.module('myApp')
    .service('starsService', ['$rootScope', '$location', 'alertsService',
        function ($rootScope, $location, alertsService) {

            this.build = function () {

                var star = {
                    _id: null,
                    names: [],
                }

                return star;
            }

            this.getStars = function (callback) {
                mongo(function (db) {
                    db.collection('stars').find({}).toArray(function (err, list) {
                        db.close()


                        if (angular.isFunction(callback))
                            callback(list);
                    });
                });
            };

            this.addStar = function (newDataSource, callback) {
                mongo(function (db) {
                    var collection = db.collection('stars');

                    autoIncrement.getNextSequence(db, 'stars', function (err, autoIndex) {

                        newDataSource._id = autoIndex;

                        collection.insert(newDataSource, function (err, result) {
                            db.close()

                            if (angular.isFunction(callback))
                                callback(result);
                        });
                    });
                });
            };

            this.removeStar = function (star, callback) {
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