// Storage
// https://github.com/jviotti/electron-json-storage
window.storage = require('electron-json-storage');

// electron

//prevent url change on file drop
document.addEventListener('dragover', function (event) {
    event.preventDefault();
    return false;
}, false);

document.addEventListener('drop', function (event) {
    event.preventDefault();
    return false;
}, false);

// Dialogs
// https://github.com/electron/electron/blob/master/docs/api/dialog.md
const remote = require('electron').remote;

window.dialog = {

    selectFileDialog: function (callback, filters) {
        remote.dialog.showOpenDialog(
            {
                title: "Select file",
                properties: ['openFile'],
                filters: filters
            },
            callback
        );
    },
    selectFilesDialog: function (callback, filters) {
        remote.dialog.showOpenDialog(
            {
                title: "Select files",
                properties: ['openFile', 'multiSelections'],
                filters: filters
            },
            callback
        );
    },
    selectFolderDialog: function (callback, filters) {
        remote.dialog.showOpenDialog(
            {
                title: "Select folder",
                properties: ['openDirectory'],
                filters: filters
            },
            callback
        );
    },
    selectFoldersDialog: function (callback, filters) {
        remote.dialog.showOpenDialog(
            {
                title: "Select folders",
                properties: ['openDirectory', 'multiSelections'],
                filters: filters
            },
            callback
        );
    }

};

// Database

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

// Angular

window.$apply = function (scope) {
    _.defer(function () {
        scope.$apply();
    });
};
