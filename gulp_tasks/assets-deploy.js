var gulp         = require('gulp');
var awspublish   = require('gulp-awspublish');
var pkg          = require('../package');
var rename       = require('gulp-rename');
var merge        = require('merge-stream');

var headers = {
   'Cache-Control': 'max-age=315360000, no-transform, public'
 };

gulp.task('assets-deploy', function() {
  if (!process.env.AWS_KEY || !process.env.AWS_SECRET) {
    console.error('ERROR: No AWS credentials found.');
    return;
  }

  var publisher = awspublish.create({
    key: process.env.AWS_KEY,
    secret: process.env.AWS_SECRET,
    bucket: 'shared-scripts'
  });

  var scripts = gulp.src(['./dist/deploy/hui-' + pkg.version + '/scripts/index.*'])
    .pipe(rename(function (path) {
      path.dirname += '/hui-' + pkg.version + '/scripts/';
    }))
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());

  var styles = gulp.src(['./dist/deploy/hui-' + pkg.version + '/styles/index.*'])
    .pipe(rename(function (path) {
      path.dirname += '/hui-' + pkg.version + '/styles/';
    }))
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());

  var images = gulp.src(['./dist/deploy/hui-' + pkg.version + '/images/*.*'])
    .pipe(rename(function (path) {
      path.dirname += '/hui-' + pkg.version + '/images/';
    }))
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());

  var index = gulp.src(['./dist/deploy/hui-' + pkg.version + '/index.*'])
    .pipe(rename(function (path) {
      path.dirname += '/hui-' + pkg.version + '/';
    }))
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());

  var thirdParty = gulp.src(['./dist/deploy/hui-' + pkg.version + '.*'])
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());

  return merge(scripts, styles, images, index, thirdParty)
});
