var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var del = require('del');
var $ = require('gulp-load-plugins')();

// set variable via $ gulp --type production
var environment = $.util.env.type || 'development';
var isProduction = environment === 'production';

var port = $.util.env.port || 5000;
var app = 'app/';
var dist = 'dist/';

//styles
gulp.task('styles', function() {
  gulp.src([app + 'less/index.less']) //多个文件以数组形式传入
    .pipe(less())
    .pipe(gulp.dest('dist/css')); //将会在src/css下生成index.css以及detail.css
});

gulp.task('scripts', function() {
  return gulp.src(app + 'js/index.js')
    .pipe(isProduction ? $.uglify() : $.util.noop())
    .pipe(gulp.dest(dist + 'js/'))
    .pipe($.size({title: 'js'}))
    .pipe($.connect.reload());
});

// copy html from app to dist
gulp.task('html', function() {
  return gulp.src(app + '*.html')
    .pipe(gulp.dest(dist))
    .pipe($.size({title: 'html'}))
    .pipe($.connect.reload());
});

// add livereload on the given port
gulp.task('serve', function() {
  $.connect.server({
    root: dist,
    port: port,
    livereload: {
      port: 5000
    }
  });
});

//copy mock data
gulp.task('mock', function() {
  return gulp.src(app + 'mock/**/*.json')
    .pipe(gulp.dest(dist + 'mock/'));
});

// watch styl, html and js file changes
gulp.task('watch', function() {
  gulp.watch(app + 'less/**/*.less', ['styles']);
  gulp.watch(app + '*.html', ['html']);
  gulp.watch(app + 'js/**/*.js', ['scripts']);
  gulp.watch(app + 'js/**/*.jsx', ['scripts']);
});

// remove bundels
gulp.task('clean', function(cb) {
  return del([dist], cb);
});

// by default build project and then watch files in order to trigger livereload
gulp.task('default', ['mock', 'html', 'scripts', 'styles', 'serve', 'watch']);

// waits until clean is finished then builds the project
gulp.task('build', ['clean'], function() {
  gulp.start(['html', 'scripts', 'styles']);
});