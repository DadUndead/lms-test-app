const gulp = require('gulp')
const del = require('del')
const rename = require('gulp-rename')
const ignore = require('gulp-ignore')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')

//JS----------------------------------------
const minify = require('gulp-minify')

//CSS--------------------------------------
const concatCss = require('gulp-concat-css')
const prefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const stripCssComments = require('gulp-strip-css-comments')

//SCORM=======================================
const manifest = require('gulp-scorm-manifest')

const paths = {
  src:{
    html:['./src/index.html'],
    scripts: ['./src/scripts/**/*.js'],
    styles: [
      './src/styles/**/*.css',
      './bower_components/bootstrap/dist/css/bootstrap.min.css'
    ],
    libs:[
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/bootstrap/dist/js/bootstrap.min.js',
        './bower_components/lodash/dist/lodash.min.js',
        './bower_components/pipwerks.scorm/SCORM_API_wrapper.js'
    ],
    fonts:[
      './bower_components/bootstrap/dist/fonts/**/*.*'
    ]
  },
  out:{
    html:'./build/',
    scripts:'./build/js/index.js',
    styles:'./build/css/',
    libs:'./build/js/libs/',
    fonts:'./build/fonts',
  }
};

gulp.task('default', ['clean'], () => gulp.start('manifest'))
gulp.task('build', [
          'watch',
          'js:build',
          'js:lib:build',
          'fonts:build',
          'css:build',
          'html:build'
])

gulp.task('clean', () => del(['build']))

gulp.task('js:build', [], () =>
    gulp.src(paths.src.scripts)
        .pipe(sourcemaps.init())
        .pipe(babel({
          presets: ['babel-preset-es2015']
        }))
        .pipe(concat('main.js'))
        .pipe(minify({
          ext:{
              src:'main.js',
              min:'.js'
          },
          noSource:true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/js/'))
)

gulp.task('css:build', [], () =>
    gulp.src(paths.src.styles)
        .pipe(prefixer())
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css/'))
)

gulp.task('js:lib:build', [], () =>
    gulp.src(paths.src.libs)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest(paths.out.libs))
)

gulp.task('html:build', [], () =>
    gulp.src(paths.src.html)
        .pipe(gulp.dest(paths.out.html))
)

gulp.task('fonts:build', [], () =>
    gulp.src(paths.src.fonts)
        .pipe(gulp.dest(paths.out.fonts))
)

// Rerun the task when a file changes
gulp.task('watch', () => {
  gulp.watch(paths.src.scripts, ['manifest']);
  gulp.watch(paths.src.styles, ['manifest']);
  gulp.watch(paths.src.html, ['manifest']);
});

gulp.task('manifest', ['build'], function() {
  gulp.src(paths.out.html+'**')
    .pipe(manifest({
      version: '1.2',
      courseId: 'TEST LMS APP1',
      SCOtitle: 'TEST LMS APP',
      moduleTitle: 'TEST LMS APP',
      launchPage: 'index.html',
      fileName: 'imsmanifest.xml'
    }))
    .pipe(gulp.dest(paths.out.html))
});
