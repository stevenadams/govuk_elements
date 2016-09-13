'use strict'

var gulp = require('gulp')
var gutil = require('gulp-util')
var del = require('del')
var sass = require('gulp-sass')
var entities = require('gulp-html-entities')


// Create a govuk task to copy govuk dependencies to a govuk_modules folder

gulp.task('govuk', function() {

  // Copy govuk dependencies from node_modules to govuk_modules
  gulp.src(['node_modules/govuk_frontend_toolkit/**/*']).pipe(gulp.dest('_gulp-test/govuk_modules/govuk_frontend_toolkit/'))
  gulp.src(['node_modules/govuk_template_jinja/**/*']).pipe(gulp.dest('_gulp-test/govuk_modules/govuk_template/'))
  // gutil.log('template and tookit copied to govuk_modules');

  // Copy the govuk_template layout file to /lib
  gulp.src(['node_modules/govuk_template_jinja/views/layouts/*']).pipe(gulp.dest('_gulp-test/lib/'))
  // gutil.log('govuk_template layout copied to lib');

})

