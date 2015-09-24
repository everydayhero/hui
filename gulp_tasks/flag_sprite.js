'use strict';

var gulp      = require('gulp')
var svgmin    = require('gulp-svgmin')
var svgSprite = require('gulp-svg-sprite')
var svg2png   = require('gulp-svg2png')

gulp.task('svgFlagSprite', function () {
  return gulp.src(['./images/flags/*.svg'])
    .pipe(svgmin({
      plugins: [
        {
          cleanupNumericValues: {
            floatPrecision: 2
          }
        }
      ]
    }))
    .pipe(svgSprite({
      mode: {
        css: {
          dest: './',
          prefix: '.flag-%s',
          sprite: '../../images/flags_sprite.svg',
          layout: 'vertical',
          render: {
            'scss': { dest: '_flags_sprite.scss' }
          }
        }
      }
    }))
    .pipe(gulp.dest('./atoms/FlagIcon/'));
});

gulp.task('pngFlagSprite', ['svgFlagSprite'], function() {
  return gulp.src('./images/flags_sprite*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./images/'));
});

gulp.task('flag-sprites', ['pngFlagSprite']);
