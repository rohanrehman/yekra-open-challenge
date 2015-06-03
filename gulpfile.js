
// gulp
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    connect = require('gulp-connect'),
    compass          = require('gulp-compass'),
    autoprefixer     = require('gulp-autoprefixer'),
    minifycss        = require('gulp-minify-css'),
    uglify           = require('gulp-uglify'),
    rename           = require('gulp-rename'),
    notify           = require('gulp-notify'),
    livereload       = require('gulp-livereload'),
    plumber          = require('gulp-plumber'),
    path             = require('path'),
    shell = require('gulp-shell');

gulp.task('server', function () {

    //return gutil.log('Gulp is running!')
    connect.server({
        root: 'public',
        port: 8000,
        livereload:true
    });
});


gulp.task('css', function() {
    return gulp.src(['public/app/assets/sass/*.scss'])
        .pipe(compass({
            css: 'public/stylesheets',
            sass: 'public/app/assets/sass',
            image: 'public/app/assets/images'
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('public/app/assets/sass/*.scss'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('public/stylesheets'))
});

//watch
gulp.task('watch', function() {
    livereload.listen(35729);
    //watch .scss files
    gulp.watch(['public/app/components/**/*.scss','public/app/assets/sass/*.scss'], ['css']);
    //reload when a template file, the minified css, or the minified js file changes
    gulp.watch(['public/app/app.js','public/app/index.html','public/app/components/**/*.js','public/app/services/*.js','public/app/components/**/*.html','public/stylesheets/app.min.css'], function(event) {
        gulp.src(event.path)
            .pipe(livereload())
    });
});

gulp.task('default', ['css','server','watch']);

