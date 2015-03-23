var gulp         = require('gulp');
var awspublish   = require('gulp-awspublish');
var pkg          = require('../package');

gulp.task('assets-deploy', ['assets-build'], function() {
  if (!process.env.AWS_KEY || !process.env.AWS_SECRET) {
    console.error('ERROR: No AWS credentials found.');
    return;
  }
  var publisher = awspublish.create({
    key: process.env.AWS_KEY,
    secret: process.env.AWS_SECRET,
    bucket: 'shared-scripts'
  });

  var headers = {
     'Cache-Control': 'max-age=315360000, no-transform, public'
   };

  return gulp.src(['./dist/deploy/hui-*' + pkg.version + '.*'])
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());
});
