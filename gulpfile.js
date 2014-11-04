var gulp = require('gulp');
var less = require('gulp-less');
var traceur = require('gulp-traceur');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var path = require('path');

var paths = {
  less: './app/less/**/*.less',
  script: './app/src/**/*.js',
  apiScripts: './api/**/*.js',
  templates: './app/templates/**/*.html',
  server: './index.js'
}

gulp.task('less', function () {
  gulp.src(paths.less)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('scripts', function () {
  gulp.src(paths.script)
    .pipe(sourcemaps.init())
    .pipe(traceur())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/js'));
});

gulp.task('templates', function() {
  gulp.src(paths.templates)
    .pipe(gulp.dest('./public/'))
})

gulp.task('apiScripts', function () {
  gulp.src(paths.apiScripts)
    .pipe(sourcemaps.init())
    .pipe(traceur())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/api/'));
})

gulp.task('server', function () {
  gulp.src(paths.server)
    .pipe(sourcemaps.init())
    .pipe(traceur())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/'));
})

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.script, ['scripts']);
  gulp.watch(paths.apiScripts, ['apiScripts']);
  gulp.watch(paths.server, ['server']);

});

gulp.task('nodemon', function() {
   nodemon({ script: './build/index.js', ext: 'html js',
   nodeArgs: ['--harmony'] })
    .on('restart', function () {
      console.log('restarted!')
    });
});


gulp.task('mithril', function() {
  gulp.src('./node_modules/mithril/mithril.js')
    .pipe(gulp.dest('./public/js'))
})

gulp.task('font-awesome', function() {
  gulp.src('./node_modules/font-awesome/css/font-awesome.css')
    .pipe(gulp.dest('./public/css'))

  gulp.src('./node_modules/font-awesome/fonts/*')
  .pipe(gulp.dest('./public/fonts'))
});

gulp.task('build', ['less', 'scripts', 'templates', 'mithril', 'font-awesome', 'server', 'apiScripts'])

gulp.task('dev', ['build', 'watch', 'nodemon'])

gulp.task('default', ['dev']);

gulp.task('heroku:production', ['build']);
