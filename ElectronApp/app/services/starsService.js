angular.module('myApp')
    .service('starsService', ['$rootScope', '$location', 'alertsService', '$q', 'genericService', 'settingsService',
        function ($rootScope, $location, alertsService, $q, genericService, settingsService) {

            var collectionName = 'stars';

            // run after fetching from db
            this.build = function (model) {

                model = genericService.build(model, {
                    properties: {
                        _id: null,
                        name: null,
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

            this.getStars = function (search) {
                if (!search)
                    search = {};
                return genericService.many(collectionName, search, this.build);
            };

            // Set
            this.addStar = function (model) {
                return this.generateThumbnail(model).then(function () {
                    return genericService.add(collectionName, model);
                });
            };

            this.saveStar = function (model) {
                return this.generateThumbnail(model).then(function () {
                    return genericService.save(collectionName, model);
                });
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

            this.generateThumbnail = function (star) {

                // variable is set ony whe new photo was picked
                if (!star.tmp.newCoverPath) {
                    console.log('No star.tmp.newCoverPath');
                    return $q.resolve();
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

                var d = $q.defer();
                require("cmd-exec").init().exec(command, function (err, res) {
                    if (err) {
                        alert(err)
                        console.log(err.message);
                        d.reject(err);
                    }
                    d.resolve(pathThumbnail);
                });
                return d.promise;
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

            var _DB = 'mongodb://localhost:27017/media';

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


            this.execute = function (fun) {
                return MongoClient.connect(_DB)
                    .then(db => { return fun(db); })
                    .catch(error => {
                        alert(error);
                        console.error(error);
                        return $q.reject(error);
                    });
            };


            // CRUD
            this.single = function (collectionName, id, build) {
                return this.execute(db => {
                    return db.collection(collectionName).findOne({ _id: id })
                        .then(result => {

                            if (result) { build(result); }

                            db.close();
                            return $q.resolve(result);
                        })
                });
            };

            this.many = function (collectionName, search, build) {
                return this.execute(db => {
                    return db.collection(collectionName).find(search).toArray()
                        .then(result => {

                            angular.forEach(result, (value, key) => { build(value); });

                            db.close();
                            return $q.resolve(result);
                        });
                });
            };

            this.any = function (collectionName, search, build) {
                return this.execute(db => {
                    return db.collection(collectionName).findOne(search)
                        .then(result => {

                            if (result) {
                                return $q.resolve(true);
                            }
                            else {
                                return $q.resolve(false);
                            }
                        })
                });
            };

            this.add = function (collectionName, model) {

                var genericService = this;
                return genericService.execute(db => {

                    var collection = db.collection(collectionName);

                    return getNext_Id(db, collectionName).then(autoIndex => {

                        model._id = autoIndex;

                        genericService.clean(model);

                        return collection.insert(model).then(result => {
                            db.close();
                            return $q.resolve(model._id);
                        });
                    });

                });
            };

            this.save = function (collectionName, model) {
                var self = this;
                return self.execute(db => {

                    return self.any(collectionName, { _id: model._id }).then(result => {
                        if (!result) {
                            throw 'Document doesn\'t exist in database';
                        }
                        else {
                            self.clean(model);

                            return db.collection(collectionName).updateOne({ _id: model._id }, model).then(result => {
                                db.close();
                                return $q.resolve(result);
                            });
                        }
                    })

                });
            };

            this.remove = function (star, callback) {
                mongo(function (db) {
                    var collection = db.collection('stars');

                    collection.deleteOne({ _id: star._id }, function (err, result) {
                        db.close()

                        if (angular.isFunction(callback))
                            callback(result);
                    });
                });
            };

            // Utils
            function getNext_Id(db, collectionName) {
                var d = $.Deferred();
                autoIncrement.getNextSequence(db, collectionName, function (error, res) {

                    if (error) {
                        d.reject(err);
                    }

                    d.resolve(res);
                });
                return d.promise();
            };

        }]);