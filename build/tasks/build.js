const gulp = require('gulp');
const changed = require('gulp-changed');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const ngAnnotate = require('gulp-ng-annotate');
const sourceMaps = require('gulp-sourcemaps');
const less = require('gulp-less');
const sass = require('gulp-sass');
const lessPluginCleanCSS = require("less-plugin-clean-css");
const runSequence = require('run-sequence');
const browserSync = require('browser-sync');
const ifElse = require('gulp-if-else');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const merge = require('merge-stream');

var liveEnv = false;

const paths = require('../paths');
const babelOptions = require('../babelOptions');

const cleancss = new lessPluginCleanCSS({
    advanced: true,
    keepSpecialComments: 0,
    keepBreaks: false
});

gulp.task('build', () => {
    runSequence('clean',
        [
            'compile-js',
            'compile-html',
            'compile-style',
            'compile-vendor',
            'move'
        ], () => {
            process.exit(0);
        }
    );
});

gulp.task('compile-js', () => {
    return gulp.src(paths.app.scripts)
        .pipe(plumber())
        .pipe(changed(paths.outputSource, { extension: '.js' }))
        //.pipe(uglify())
        .pipe(babel(babelOptions))
        .pipe(gulp.dest(paths.outputSource))
});

gulp.task('compile-html', () => {
    return gulp.src(paths.app.templates)
        .pipe(plumber())
        .pipe(changed(paths.outputSource, { extension: '.html' }))
        .pipe(gulp.dest(paths.outputSource))
});

gulp.task('compile-style', () => {
    let lessStream = gulp.src(paths.app.less)
        .pipe(less({
            plugins: [ cleancss ]
        }))
        .pipe(concat('concated-styles.less'));

    let sassStream = gulp.src(paths.app.sass)
        .pipe(sass())
        .pipe(concat('concated-styles.sass'));

    let cssStream = gulp.src(paths.app.css)
        .pipe(concat('concated-styles.css'));

    let mergedCssStream = merge(lessStream, sassStream, cssStream)
        .pipe(plumber())
        .pipe(changed(paths.outputCss, { extension: '.css' }))
        .pipe(concat('core.css'))
        .pipe(ifElse(liveEnv, uglify))
        .pipe(gulp.dest(paths.outputCss))
        .pipe(browserSync.reload({ stream: true }));

    return mergedCssStream;
});

gulp.task('compile-vendor', () => {
    return gulp.src(paths.vendor.js)
        .pipe(plumber())
        .pipe(changed(paths.outputSource, { extension: '.js' }))
        //.pipe(uglify())
        .pipe(gulp.dest(paths.outputVendor))
});
