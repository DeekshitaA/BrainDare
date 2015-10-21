var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var useref = require('gulp-useref');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var flatten = require('gulp-flatten');

var paths = {
  sass: ['./scss/**/*.scss'],
  templateCache:['./www/templates/**/*.html'],
  ng_annotate: ['./www/js/**/*.js'],
  useref: ['./www/*.html']
};

gulp.task('default', [ 'sass', 'templatecache', 'ng_annotate', 'concat']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('templatecache', function(done){
  gulp.src('./www/templates/**/*.html')
    .pipe(templateCache({standalone: true}))
    .pipe(gulp.dest('./www/js'))
    .on('end', done);
});

gulp.task('ng_annotate', function(done){
  gulp.src('./www/js/**/*.js')
    .pipe(ngAnnotate({single_quotes: true}))
    .pipe(flatten())
    .pipe(gulp.dest('./www/dist/dist_js'))
    .on('end', done);
});

gulp.task('concat', function (done) {
  // Concatenate all custom js files
  gulp.src('./www/js/**/*.js')
    .pipe(concat('bd.min.js'))
    .pipe(gulp.dest('./www/dist/dist_js'))
    .on('end', done);
});

gulp.task('useref', function(done){
  var assets = useref.assets();
  gulp.src('./www/*.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('./www/dist'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.templateCache, ['templateCache']);
  gulp.watch(paths.ng_annotate, ['ng_annotate']);
  gulp.watch(paths.useref, ['useref']);
  gulp.watch(paths.ng_annotate, ['concat']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

