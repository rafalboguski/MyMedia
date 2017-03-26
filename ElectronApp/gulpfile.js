var gulp = require("gulp");
var ts = require("gulp-typescript");
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var tsProject = ts.createProject("tsconfig.json");


gulp.task('watch', [], function () {

    gulp.watch([
        "./app/**/*.ts",
        "./app/**/*.js",
        "./main.js",
        "./renderer.js"

    ], ['build']);
    gulp.watch([
        './app/**/*.html',
        './*.html',

    ], ['move']);

});

gulp.task("build", function () {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist"));
});


gulp.task('move', function () {
    return gulp.src([
        'app/**/*.html',
        '*.html',
    ], { base: '.' })
        .pipe(gulp.dest('dist'));
});

// source maps in separate files, don't work with chromium
// gulp.task("build", function () {
//     return tsProject.src()
//         .pipe(sourcemaps.init())
//         .pipe(tsProject())
//         .js
//         .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '' }))
//         .pipe(gulp.dest("dist"));
// });