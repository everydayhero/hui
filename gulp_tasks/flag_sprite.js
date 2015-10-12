'use strict';

var gulp      = require('gulp')
var svgmin    = require('gulp-svgmin')
var svgSprite = require('gulp-svg-sprite')
var svg2png   = require('gulp-svg2png')

gulp.task('svgFlagSprite', function () {
  return gulp.src(['./images/flags/*.svg'])
    .pipe(svgmin({
      multipass: true,
      plugins: [
        {
          cleanupNumericValues: {
            floatPrecision: 1
          }
        }
      ]
    }))
    .pipe(svgSprite({
      variables: {
        png: function() {
          return function(sprite, render) {
            return render(sprite).split('.svg').join('.png');
          }
        }
      },
      mode: {
        css: {
          dest: './',
          prefix: '.hui-Flag-%s',
          sprite: '../../images/flags_sprite.svg',
          layout: 'vertical',
          render: {
            'scss': {
              dest: '_flags_sprite.scss',
              template: 'atoms/FlagIcon/_flags_sprite.scss.mst'
            }
          }
        }
      }
    }))
    .pipe(gulp.dest('./atoms/FlagIcon/'));
});

gulp.task('pngFlagSprite', ['svgFlagSprite'], function() {
  return gulp.src('./images/flags_sprite*.svg')
    .pipe(svg2png(0.1))
    .pipe(gulp.dest('./images/'));
});

gulp.task('flag-sprites', ['pngFlagSprite']);
