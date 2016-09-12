var gulp = require('gulp')

gulp.task('setup', function() {

  // Copy govuk dependencies from node_modules to govuk_modules
  gulp.src(['node_modules/govuk_frontend_toolkit/']).pipe(gulp.dest('govuk_modules/govuk_frontend_toolkit/'))
  gulp.src(['node_modules/govuk_template_jinja/']).pipe(gulp.dest('govuk_modules/govuk_template/'))

  // Copy the govuk_template layout file to /lib
  gulp.src(['node_modules/govuk_template_jinja/views/layouts/']).pipe(gulp.dest('lib/'))

  // Copy assets to /public
  gulp.src(['app/assets/**/*']).pipe(gulp.dest('public'))
}

// Compile scss fiiles to css
gulp.task('styles', function() {

})


// Lint install scss

// Encode HTML snippets to app/snippets/encoded

// Use Browsersync to watch for changes and restart app

// Default task
// Lists out available tasks
gulp.task('default', function () {
  console.log('Your first task')
})
