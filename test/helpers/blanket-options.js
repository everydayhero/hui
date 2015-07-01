'use strict';

module.exports = {
  'data-cover-only': [
    './**/*.js'
  ],
  'data-cover-never': [
    'bin',
    'dist',
    'sass',
    'images',
    'static-files',
    'gulp-tasks',
    'node_modules',
    'test',
    '__tests__',
    '-test',
    'Shim',
    'shim'
  ],
  'data-cover-loader': '../../../test/helpers/blanket-stub.js'
};
