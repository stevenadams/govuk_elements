var gulp = require('gulp')
var gutil = require('gulp-util')
var del = require('del')
var sass = require('gulp-sass')
var scsslint = require('gulp-scss-lint')
var entities = require('gulp-html-entities')
var runsequence = require('run-sequence')
var standard = require('gulp-standard')

// Delete the _gulp-test folder
gulp.task('clean', function (callback) {
  return del(['_gulp-test'])
})

// Create a govuk task to copy govuk dependencies to a govuk_modules folder
gulp.task('copy', ['clean'], function (cb) {
  // Copy govuk dependencies from node_modules to govuk_modules
  gulp.src(['node_modules/govuk_frontend_toolkit/**/*'])
    .pipe(gulp.dest('_gulp-test/govuk_modules/govuk_frontend_toolkit/'))
    .on('end', cb)

  gulp.src(['node_modules/govuk_template_jinja/**/*'])
    .pipe(gulp.dest('_gulp-test/govuk_modules/govuk_template/'))

  // Copy the govuk_template layout file to /lib
  gulp.src(['node_modules/govuk_template_jinja/views/layouts/*'])
    .pipe(gulp.dest('_gulp-test/lib/'))

  gutil.log('copy task complete')
})

// Encode HTML snippets
gulp.task('encode', function () {
  // Move snippets to a test folder
  gulp.src(['app/views/snippets/**/*'])
    .pipe(gulp.dest('_gulp-test/app/views/snippets/'))

  return gulp.src('./_gulp-test/app/views/snippets/*')
    .pipe(entities('encode'))
    .pipe(gulp.dest('./_gulp-test/app/views/snippets/encoded/'))
})

// Compile scss from public/sass to public/stylesheets
gulp.task('styles', function () {
  return gulp.src('./public/sass/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: [
        '_gulp-test/govuk_modules/govuk_template/assets/stylesheets',
        '_gulp-test/govuk_modules/govuk_frontend_toolkit/stylesheets'
      ]
    }).on('error', sass.logError))
    .pipe(gulp.dest('_gulp-test/public/stylesheets'))
})

gulp.task('scss-lint', function () {
  return gulp.src('./public/sass/elements/**/*.scss')
    .pipe(scsslint({
      'bundleExec': true,
      'config': '.scss-lint.yml'
    }))
})

gulp.task('standard', function () {
  return gulp.src([
    './public/javascripts/*.js'
  ])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
})

// Build - run the govuk copy task, compile scss, encode HTML snippets, lint scss and js
gulp.task('build', function (callback) {
  runsequence('copy', ['styles', 'encode', 'lint'], callback)
})

// Lint - lint scss and js
gulp.task('lint', function (callback) {
  runsequence(['scss-lint', 'standard'], callback)
})

// Test - run the build task
gulp.task('test', function (callback) {
  runsequence(['build'], callback)
})
