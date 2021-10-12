
// gulp
const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const replace = require('gulp-replace');
var webpack = require('gulp-webpack');



// compilers
function compileScss(cb) {
  gulp.src('./src/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(rename({dirname: '/' }))
  .pipe(gulp.dest('./dist'));

  // whatsAppUserStyles();

  cb();
}

// function whatsAppUserStyles() {
//   return gulp.src('./src/**/whatsapp.com.scss')
//   .pipe(sass().on('error', sass.logError))
//   .pipe(sass({outputStyle: 'compressed'}))
//   .pipe(replace('gold', '/*[[theme-color]]*/'))
//   .pipe(replace('/*!USSTART*/', '@-moz-document domain("web.whatsapp.com") {'))
//   .pipe(replace('/*!USEND*/', '}'))
//   .pipe(rename({dirname: '/', basename: 'whatsappUserstyles'}))
//   .pipe(gulp.dest('./dist'));
// }

function renameGlobal() {
  return gulp.src('./dist/**/global.css')
    .pipe(rename({dirname: '/', basename: '_global'}))
    .pipe(gulp.dest('./dist'));
}

function compileJs() {
  return gulp.src('./src/**/*.js')
    // .pipe(webpack(require('./webpack.config.js') ))
    .pipe(rename({dirname: '/'}))
    .pipe(gulp.dest('./dist'));
}

// watchers
function watch() {
  gulp.watch('./src/**/*.*', gulp.series(deleteDist, allCompilers));
};

// delete build
function deleteDist() {
  return gulp.src('./dist', {read: false, allowEmpty: true}).pipe(clean());
}



// exports
var allCompilers = gulp.series(compileScss, renameGlobal, compileJs);
gulp.task("default", gulp.series(deleteDist, allCompilers, watch));