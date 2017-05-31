var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

// connect to server and livereload
var connect = require('gulp-connect-multi')(); 

gulp.task('connect', connect.server({
    host: '127.0.0.1',
    root: ['site'],
    port: 8080,
    livereload: true,
    open: {
        browser: 'chrome'
    }
}));



// templates
var pug = require('gulp-pug');

gulp.task('templates', function() {
    gulp.src('./dev/pug/**/*.pug')
        .pipe(plumber())
        .pipe(pug())
        .pipe(gulp.dest('./site/'))
        .pipe(gulp.dest('./docs/'))
        .pipe(connect.reload());
});

// Create task for Sass

gulp.task('sass', function () {
    return gulp.src(['./dev/sass/**/*.sass', './dev/sass/**/*.scss'])
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 9'))
        .pipe(gulp.dest('./site/css'))
        .pipe(gulp.dest('./docs/css'))
        .pipe(connect.reload());
});



gulp.task('copy-images', function () {
  gulp.src('./dev/img/**/*.*')
    .pipe(gulp.dest('./site/img'))
    .pipe(gulp.dest('./docs/img'))
    .pipe(connect.reload());
});

gulp.task('copy-js', function () {
  gulp.src('./dev/js/*.*')
    .pipe(gulp.dest('./site/js'))
    .pipe(gulp.dest('./docs/js'))
    .pipe(connect.reload());
});


// watcher
gulp.task('watcher', function() {
    gulp.watch('pug/**/*.pug', {cwd:'./dev/'}, ['templates']);
    gulp.watch(['sass/**/*.sass', 'sass/**/*.scss'], {cwd:'./dev/'}, ['sass']);
    gulp.watch('img/**/*.*', {cwd:'./dev/'}, ['copy-images']);
    gulp.watch('js/**/*.*', {cwd:'./dev/'}, ['copy-js']);
});

gulp.task('default', ['templates', 'sass', 'copy-images', 'copy-js']);
gulp.task('item', ['default', 'connect', 'watcher']);