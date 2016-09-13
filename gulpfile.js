'use strict'

var gulp = require('gulp')
var nodemon = require('gulp-nodemon')
var browserSync = require('browser-sync').create()
var reload = browserSync.reload

var gutil = require('gulp-util')
var del = require('del')

var sass = require('gulp-sass')
var scsslint = require('gulp-scss-lint')
var standard = require('gulp-standard')

var entities = require('gulp-html-entities')
var runsequence = require('run-sequence')

// Delete the _gulp-test folder
gulp.task('clean', function (callback) {
  return del(['_gulp-test'])
})

// Create a govuk task to copy govuk dependencies to a govuk_modules folder
// gulp.task('copy', ['clean'], function (cb) {
//   // Copy govuk dependencies from node_modules to govuk_modules
//   gulp.src(['node_modules/govuk_frontend_toolkit/**/*'])
//     .pipe(gulp.dest('_gulp-test/govuk_modules/govuk_frontend_toolkit/'))
//     .on('end', cb)

//   gulp.src(['node_modules/govuk_template_jinja/**/*'])
//     .pipe(gulp.dest('_gulp-test/govuk_modules/govuk_template/'))

//   // Copy the govuk_template layout file to /lib
//   gulp.src(['node_modules/govuk_template_jinja/views/layouts/*'])
//     .pipe(gulp.dest('_gulp-test/lib/'))

//   gutil.log('copy govuk assets - task complete')
// })

// Encode HTML snippets
// gulp.task('encode', function () {
//   // Move snippets to a test folder
//   gulp.src(['app/views/snippets/**/*'])
//     .pipe(gulp.dest('_gulp-test/app/views/snippets/'))

//   gutil.log('copy test snippets - task complete')

//   return gulp.src('./_gulp-test/app/views/snippets/*')
//     .pipe(entities('encode'))
//     .pipe(gulp.dest('./_gulp-test/app/views/snippets/encoded/'))
// })

// Compile scss from public/sass to public/stylesheets
gulp.task('styles', function () {
  return gulp.src('/public/sass/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded',
      includePaths: [
        '/govuk_modules/govuk_template/assets/stylesheets',
        '/govuk_modules/govuk_frontend_toolkit/stylesheets'
      ]
    }).on('error', sass.logError))
    .pipe(gulp.dest('/public/stylesheets/'))
    .pipe(browserSync.stream())
})

// gulp.task('scss-lint', function () {
//   return gulp.src('./public/sass/elements/**/*.scss')
//     .pipe(scsslint({
//       'bundleExec': true,
//       'config': '.scss-lint.yml'
//     }))
// })

// gulp.task('standard', function () {
//   return gulp.src([
//     './public/javascripts/*.js'
//   ])
//     .pipe(standard())
//     .pipe(standard.reporter('default', {
//       breakOnError: true,
//       quiet: true
//     }))
// })

// Build - run the govuk copy task, compile scss, encode HTML snippets, lint scss and js
// gulp.task('build', function (callback) {
//   runsequence('copy', ['styles', 'encode', 'lint'], callback)
// })

// Lint - lint scss and js
// gulp.task('lint', function (callback) {
//   runsequence(['scss-lint', 'standard'], callback)
// })

gulp.task('serve',
  [
    'browser-sync'
  ],
  function () {
    gulp.watch('public/*.js').on('change', reload)
    gulp.watch('public/*.css').on('change', reload)
    gulp.watch('app/views/*.html').on('change', reload)
  }
)

gulp.task('browser-sync'),
  [
    'nodemon'
  ],
  function () {
    browserSync.init(null, {
      proxy: 'http://localhost',
      browser: 'google chrome',
      port: 3000
    }
  }
)

gulp.task('nodemon'),
  [],
  function (done) {
    var running = false

    return nodemon({
      script: 'server.js',
      watch: 'server.js'
    })
    .on('start', function () {
      if (!running) {
        done()
      }
      running = true
    })
    .on('restart', function () {
      setTimeout(function () {
        reload()
      }, 500)
    })
  }
)
