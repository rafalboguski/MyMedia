var gulp = require("gulp");
var ts = require("gulp-typescript");
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
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task('move', function () {
    return gulp.src([
        'app/**/*.html',
        '*.html',
    ], { base: '.' })
        .pipe(gulp.dest('dist'));
});