angular.module('myApp')
    .service('starsService', ['$rootScope', '$location', 'alertsService', 'settingsService',
        function ($rootScope, $location, alertsService, settingsService) {

            this.collectionName = 'stars';

            this.build = function (model) {

                if (!model) { model = {}; }

                // add fiels if they don't exist
                _.defaults(model, {
                    _id: null,
                    names: [],
                    hasCover: false,
                    tmp: {
                        newCoverPath: null
                    }
                });

                // add functions
                model.functions = {
                    getThumbnail: function () {

                        var path = null;

                        if (model._id !== null) {

                            if (model.hasCover) {
                                path = $rootScope.settings.paths.globalData + '\\covers\\stars\\thumbails\\' + model._id + ".jpg";

                            }
                            else {
                                path = $rootScope.settings.paths.globalData + '\\covers\\placeholder.jpg';
                            }

                        }
                        else {
                            path = model.tmp.newCoverPath;
                        }

                        if(path){
                            path += '?'+ new Date().getTime();
                        }
                        console.log(path);

                        return path;
                    }

                };

                return model;
            }

            // Get
            this.getStar = function (id, callback) {
                mongo(function (db, self) {
                    db.collection(self.collectionName).findOne({ _id: id }, function (err, result) {
                        if (result) {
                            self.build(result);
                        }
                        self.Finish(err, result, db, callback);
                    });
                }, this);
            };

            this.getStars = function (callback) {
                mongo(function (db, self) {
                    db.collection(self.collectionName).find({}).toArray(function (err, list) {

                        angular.forEach(list, function (value, key) {
                            self.build(value);
                        });

                        self.Finish(err, list, db, callback);
                    });
                }, this);
            };

            // Set
            this.addStar = function (model, callback) {
                mongo(function (db, self) {
                    var collection = db.collection(self.collectionName);

                    autoIncrement.getNextSequence(db, self.collectionName, function (err, autoIndex) {

                        model._id = autoIndex;

                        // add thumbnail
                        self.generateThumbnail(model, function () {
                            // clean not persisted data
                            delete model.functions;
                            delete model.tmp;

                            // insert
                            collection.insert(model, function (err, result) {
                                self.Finish(err, result.insertedIds[0], db, callback);
                            });
                        });
                    });
                }, this);
            };

            this.saveStar = function (model, callback) {
                mongo(function (db, self) {
                    var collection = db.collection(self.collectionName);

                    collection.findOne({ _id: model._id }, function (err, result) {

                        if (result === null) {
                            alert('no such star');
                            console.log('no such star', model);
                            self.Finish(err, result, db, callback);
                        }
                        else if (model) {

                            // add thumbnail
                            self.generateThumbnail(model, function () {

                                // clean not persisted data
                                delete model.functions;
                                delete model.tmp;

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