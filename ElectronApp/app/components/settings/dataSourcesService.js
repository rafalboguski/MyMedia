angular.module('myApp')
    .service('dataSourcesService', ['$rootScope', 'alertsService', 'GenericService',
        function ($rootScope, alertsService, GenericService) {

            this.getDataSources = function (callback) {
                GenericService.mongo(function (db) {
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
                GenericService.mongo(function (db) {
                    var collection = db.collection('dataSources');

                    collection.findOne({ path: newDataSource.path }, function (err, document) {

                        if (document == null) {
                            autoIncrement.getNextSequence(db, 'dataSources', function (err, autoIndex) {

                                newDataSource._id = autoIndex;

                                collection.insert(newDataSource, function (err, result) {
                                    db.close()
                                    console.log('addDataSources => ', result)

                                    if (angular.isFunction(callback))
                                        callback(result);
                                });
                            });
                        }
                    });
                });
            };

            this.removeDataSource = function (dataSource, callback) {
                GenericService.mongo(function (db) {
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
                GenericService.mongo(function (db) {
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