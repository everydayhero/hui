'use strict'

var gulp = require('gulp')
var gutil = require('gulp-util')
var concat = require('gulp-concat')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var pkg = require('../package')
var rename = require('gulp-rename')
var inject = require('gulp-inject')
var merge = require('merge-stream')
var replace = require('gulp-replace')
// stylesheets
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var minifyCss = require('gulp-minify-css')

// javascripts
var browserify = require('browserify')
var uglify = require('gulp-uglify')

// Tasks
require('./assets-deploy')
require('./lint')

var debug = !!gutil.env.debug

process.env.NODE_ENV = debug ? 'development' : 'production'

gulp.task('assets-styles', function () {
  var compress = debug ? gutil.noop : minifyCss

  return gulp
    .src(['./assets.scss'])
    .pipe(sass({
      precision: 10,
      imagePath: 'images'
    }))
    .pipe(concat('index.css'))
    .pipe(autoprefixer())
    .pipe(compress())
    .pipe(rename('hui-' + pkg.version + '.css'))
    .pipe(gulp.dest('./dist/deploy/'))
})

gulp.task('assets-scripts', ['lint'], function () {
  var compress = debug ? gutil.noop : uglify

  var bundler = browserify({
    entries: ['./assets.js'],
    debug: debug
  })

  return bundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('index.js'))
      .pipe(buffer())
      .pipe(compress())
      .pipe(rename('hui-' + pkg.version + '.js'))
      .pipe(gulp.dest('./dist/deploy/'))
})

gulp.task('assets-images', function () {
  return gulp
    .src('./images/*', { base: './images' })
    .pipe(gulp.dest('./dist/deploy/hui-' + pkg.version + '/images'))
})

gulp.task('guide-index', ['styles', 'scripts', 'images'], function () {
  var sources = gulp.src([
    'dist/*/index.*'
  ], { read: false })

  var moveFiles = gulp
    .src([
      'dist/*/index.*'
    ])
    .pipe(gulp.dest('dist/deploy/hui-' + pkg.version))

  var moveIndex = gulp
    .src('index.ejs')
    .pipe(inject(sources, {
      transform: function (filepath, file, i, length) {
        // remove `/dist` from the filepath
        filepath = './' + filepath.split('/').slice(2).join('/')
        return inject.transform(filepath, file, i, length)
      }
    }))
    .pipe(replace('<%- content %>', 'Loading...'))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist/deploy/hui-' + pkg.version))

  return merge(moveFiles, moveIndex)
})

gulp.task('assets-build', ['assets-styles', 'assets-scripts', 'assets-images', 'guide-index'])
