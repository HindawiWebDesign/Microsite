var gulp            = require('gulp');
var sass            = require('gulp-sass');
var browserSync     = require('browser-sync').create();
var useref          = require('gulp-useref');
var uglify          = require('gulp-uglify');
var gulpIf          = require('gulp-if');
var cssnano         = require('gulp-cssnano');
var imagemin        = require('gulp-imagemin');
var del             = require('del');
var runSequence     = require('run-sequence');
const sourcemaps    = require('gulp-sourcemaps');
const autoprefixer  = require('gulp-autoprefixer');
const concat        = require('gulp-concat');


// Gulp Tasks

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(imagemin({
      interlaced: true
    }))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

// To clear Images cash
//gulp.task('cache:clear', function (callback) {
//return cache.clearAll(callback)
//})

gulp.task('autoprefixer', function () {


    return gulp.src('app/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            // browsers: ['last 2 versions'],
            // cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dest/style.css'));
});


// gulp watch
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});


// gulp (Default)
gulp.task('default', ['watch']);

// gulp.task('default', function (callback) {
//   runSequence(['sass', 'browserSync', 'watch'],
//     callback
//   )
// })


// gulp build
//gulp.task('build', ['clean:dist', 'sass', 'useref', 'images', 'fonts'], function (){
//  console.log('Building files');
//});

// gulp build by sequence
gulp.task('build', function (callback) {
  runSequence('clean:dist', 
  	['sass', 'useref', 'images', 'fonts'],
    callback
  )
});



//gulp.task('wael', function() {
//  console.log('Hello Wael');
//});
