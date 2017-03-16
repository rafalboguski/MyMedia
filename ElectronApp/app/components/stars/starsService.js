angular.module('myApp')
    .service('starsService', ['$rootScope', '$location', 'alertsService', '$q', 'genericService', 'settingsService',
        function ($rootScope, $location, alertsService, $q, genericService, settingsService) {

            var collectionName = 'stars';
            var $servive = this;
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
                var tmp = angular.copy(model.tmp);
                return genericService.add(collectionName, model).then(id => {
                    model._id = id;
                    model.tmp = tmp;
                    return $servive.generateThumbnail(model).then(function () {
                        return $servive.saveStar(model).then(res => {
                            return model._id;
                        })
                    });

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
