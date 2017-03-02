angular.module('myApp')
    .service('starsService', ['$rootScope', '$location', 'alertsService', 'genericService', 'settingsService',
        function ($rootScope, $location, alertsService, genericService, settingsService) {

            var collectionName = 'stars';

            // run after fetching from db
            this.build = function (model) {

                model = genericService.build(model, {
                    properties: {
                        _id: null,
                        names: [],
                        hasCover: false,
                    },
                    tmp: {
                        coverThumbnailPath: null,
                        coverFullPath: null,
                        newCoverPath: null // userd to insert new image
                    },
                    functions: {

                    }
                });

                // set paths
                if (model._id !== null && model.hasCover) {
                    coverThumbnailPath = $rootScope.settings.paths.globalData + '\\covers\\' + collectionName + '\\thumbails\\' + model._id + ".jpg";

                    coverFullPath = $rootScope.settings.paths.globalData + '\\covers\\' + collectionName + '\\full\\' + model._id + ".jpg";

                }
                else {
                    coverThumbnailPath = $rootScope.settings.paths.globalData + '\\covers\\placeholder.jpg';
                    coverFullPath = $rootScope.settings.paths.globalData + '\\covers\\placeholder.jpg';
                }
                model.tmp.coverThumbnailPath = coverThumbnailPath.split('\\').join('/') + '?' + new Date().getTime();
                model.tmp.coverFullPath = coverFullPath.split('\\').join('/') + '?' + new Date().getTime();

                return model;
            };

            // run before saving in db
            this.clean = function (model) {
                genericService.clean(model);
            };

            // Get
            this.getStar = function (id) {

                return genericService.single(collectionName, id, this.build);
            };

            this.getStars = function () {

                return genericService.many(collectionName, {}, this.build);
            };

            // Set
            this.addStar = function (model, callback) {
                mongo(function (db, self) {
                    var collection = db.collection(collectionName);

                    autoIncrement.getNextSequence(db, collectionName, function (err, autoIndex) {

                        model._id = autoIndex;

                        // add thumbnail
                        self.generateThumbnail(model, function () {

                            self.clean(model);

                            collection.insert(model, function (err, result) {
                                self.Finish(err, result.insertedIds[0], db, callback);
                            });
                        });
                    });
                }, this);
            };

            this.saveStar = function (model, callback) {
                mongo(function (db, self) {
                    var collection = db.collection(collectionName);

                    collection.findOne({ _id: model._id }, function (err, result) {

                        if (result === null) {
                            alert('no such star');
                            console.log('no such star', model);
                            self.Finish(err, result, db, callback);
                        }
                        else if (model) {

                            // add thumbnail
                            self.generateThumbnail(model, function () {

                                self.clean(model);

                                // save
                                collection.updateOne({ _id: model._id }, model, function (err, result) {
                                    self.Finish(err, result, db, callback);
                                });
                            });

                        }
                    });
                }, this);
            };

            // Remove
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

            this.generateThumbnail = function (star, callback) {

                // variable is set ony whe new photo was picked
                if (!star.tmp.newCoverPath) {
                    console.log('No star.tmp.newCoverPath');
                    callback();
                    return;
                }

                star.hasCover = true;

                var src = star.tmp.newCoverPath;

                var pathThumbnail = $rootScope.settings.paths.globalData + '\\covers\\stars\\thumbails\\' + star._id + ".jpg";
                var pathFull = $rootScope.settings.paths.globalData + '\\covers\\stars\\full\\' + star._id + '.jpg';

                require('fs-path').writeFile(pathFull, fs.readFileSync(src));

                var command = '"' + $rootScope.settings.paths.thumbnailGenerator + '\\tg.exe" ';
                command += '"' + src + '" ';
                command += '"' + pathThumbnail + '" ';
                command += '300 300 false true';

                require("cmd-exec").init().exec(command, function (err, res) {
                    if (err) {
                        alert(err)
                        console.log(err.message);
                    }

                    if (angular.isFunction(callback))
                        callback(pathThumbnail);
                });


            };

            this.Finish = function (err, result, db, callback) {
                db.close();

                if (err) {
                    console.log(err);
                    alert(err);
                }

                if (angular.isFunction(callback))
                    callback(result);
            };
        }]);


angular.module('myApp')
    .service('genericService', ['$rootScope', '$q', '$location', 'alertsService', 'settingsService',
        function ($rootScope, $q, $location, alertsService, settingsService) {

            var MongoClient = require('mongodb').MongoClient, assert = require('assert');
            window.autoIncrement = require("mongodb-autoincrement");

            window.mongo = function (job, self) {

                MongoClient.connect('mongodb://localhost:27017/media', function (err, db) {

                    if (err) {
                        return err;
                    }

                    job(db, self);
                });

            };

            // run after fetching from db
            this.build = function (model, data) {

                if (!model) { model = {}; }

                // add fiels if they don't exist
                _.defaults(model, data.properties);
                // tmps are not saved in db
                if (!model.tmp) {
                    model.tmp = {};
                    _.defaults(model.tmp, data.tmp);

                }

                // add functions
                model.functions = data.functions;

                return model;
            };

            // run before saving in db
            this.clean = function (model) {
                delete model.functions;
                delete model.tmp;
            };

            // Get
            this.single = function (collectionName, id, build) {
                mongo(function (db, self) {

                    db.collection(collectionName).findOne({ _id: id }, function (err, result) {
                        if (result) {
                            build(result);
                        }
                        return self.Finish(err, result, db);
                    });
                }, this);
            };

            this.many = function (collectionName, search, build) {
                var self = this;

                return MongoClient.connect('mongodb://localhost:27017/media')
                    .then(db => {
                        return db.collection(collectionName).find(search).toArray()
                            .then(result => {

                                angular.forEach(result, function (value, key) {
                                    build(value);
                                });

                                db.close();

                                return $q.resolve(result);
                                // return $q.reject( someValue );b);
                            });
                    })
                    .catch(error => {

                        return $q.reject(error);
                    });
            };

            // this.many = function (collectionName, search, build) {
            //     mongo(function (db, self) {
            //         db.collection(collectionName).find(search).toArray(function (err, list) {

            //             angular.forEach(list, function (value, key) {
            //                 build(value);
            //             });

            //             return self.Finish(err, list, db);
            //         });
            //     }, this);
            // };

            // Set
            this.addStar = function (model, callback) {
                mongo(function (db, self) {
                    var collection = db.collection(collectionName);

                    autoIncrement.getNextSequence(db, collectionName, function (err, autoIndex) {

                        model._id = autoIndex;

                        // add thumbnail
                        self.generateThumbnail(model, function () {

                            self.clean(model);

                            collection.insert(model, function (err, result) {
                                self.Finish(err, result.insertedIds[0], db, callback);
                            });
                        });
                    });
                }, this);
            };

            this.saveStar = function (model, callback) {
                mongo(function (db, self) {
                    var collection = db.collection(collectionName);

                    collection.findOne({ _id: model._id }, function (err, result) {

                        if (result === null) {
                            alert('no such star');
                            console.log('no such star', model);
                            self.Finish(err, result, db, callback);
                        }
                        else if (model) {

                            // add thumbnail
                            self.generateThumbnail(model, function () {

                                self.clean(model);

                                // save
                                collection.updateOne({ _id: model._id }, model, function (err, result) {
                                    self.Finish(err, result, db, callback);
                                });
                            });

                        }
                    });
                }, this);
            };

            // Remove
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


            this.Finish = function (result, db) {
                db.close();

                return $q.resolve(result);
                // return $q.reject( someValue );

                // if (angular.isFunction(callback))
                //     callback(result);
            };
        }]);