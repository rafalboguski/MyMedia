angular.module('myApp')
    .service('dataSourcesService', ['$rootScope', '$location', 'alertsService',
        function ($rootScope, $location, alertsService) {

            this.getDataSources = function (callback) {
                mongo(function (db) {
                    db.collection('dataSources').find({}).toArray(function (err, list) {
                        db.close()
                        console.log('getDataSources => ', list)

                        angular.forEach(list, function (value, key) {

                            if (!fs.existsSync(value.path)) {
                                value.invalid = true;
                            }

                        });


                        if (angular.isFunction(callback))
                            callback(list);
                    });
                });
            };

            this.addDataSources = function (newDataSource, callback) {
                mongo(function (db) {
                    autoIncrement.getNextSequence(db, 'dataSources', function (err, autoIndex) {

                        newDataSource._id = autoIndex;

                        var collection = db.collection('dataSources');
                        collection.insert(newDataSource, function (err, result) {
                            db.close()
                            console.log('addDataSources => ', result)

                            if (angular.isFunction(callback))
                                callback(result);
                        });
                    });
                });
            };

            this.removeDataSource = function (dataSource, callback) {
                mongo(function (db) {
                    var collection = db.collection('dataSources');

                    collection.deleteOne({ _id: dataSource._id }, function (err, result) {
                        db.close()
                        console.log('removeDataSource => ', result)

                        if (angular.isFunction(callback))
                            callback(result);
                    });
                });
            };

             this.removeAllDataSources = function (callback) {
                mongo(function (db) {
                    var collection = db.collection('dataSources');

                    collection.deleteMany({}, function (err, result) {
                        db.close()
                        console.log('removeDataSource => ', result)

                        if (angular.isFunction(callback))
                            callback(result);
                    });
                });
            };

        }]);