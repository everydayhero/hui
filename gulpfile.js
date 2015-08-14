'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')({ rename: { 'gulp-minify-css': 'minify' } });
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');

// Tasks
require('./gulp_tasks/assets-deploy');
require('./gulp_tasks/lint');
require('./gulp_tasks/assets-build');
require('./gulp_tasks/docs');

var debug = !!$.util.env.debug;
var src = {};
var exclude = [
  '!./**/*test**',
  '!./__tests__/**',
  '!./test/**',
  '!./node_modules/**',
  '!./bin/**',
  '!./gulp*',
  '!./gulp_tasks/**',
  '!./dist/**'
];

process.env.NODE_ENV = debug ? 'development' : 'production';

gulp.task('styles', function() {
  src.styles = [ 'index.scss' ];

  return gulp.src(src.styles)
    .pipe($.sass({
      imagePath: 'images'
    }))
    .pipe($.concat('index.css'))
    .pipe($.autoprefixer())
    .pipe($.if(!debug, $.minify()))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('scripts', function() {
  src.scripts = ['./**/*.js'].concat(exclude);

  var bundler = browserify({
    entries: ['./index.js'],
    transform: ['babelify'],
    insertGlobals: true,
    debug: debug
  });

  return bundler
    .bundle()
    .on('error', $.util.log.bind($.util, 'Browserify Error'))
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe($.if(!debug, $.uglify()))
    .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('index', [ 'lint', 'styles', 'scripts', 'images'], function() {
  var sources = gulp.src([
      'dist/*/index.*'
    ], { read: false });

  return gulp.src('index.ejs')
    .pipe($.inject(sources, {
      transform: function(filepath, file, i, length) {
        // remove `/dist` from the filepath
        filepath = '/' + filepath.split('/').slice(2).join('/');
        return $.inject.transform(filepath, file, i, length);
      }
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
  src.images = ['images/*.*'];

  return gulp.src(src.images)
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('build', ['index']);
gulp.task('default', [ 'build' ]);

gulp.task('watch', function() {
  gulp.watch(src.styles, [ 'styles' ]);
  gulp.watch(src.scripts, [ 'scripts' ]);
  gulp.watch('index.ejs', [ 'index' ]);
});
