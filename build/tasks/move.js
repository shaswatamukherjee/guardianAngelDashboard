const gulp = require('gulp');
const path = require('../paths');

gulp.task('moveFonts', () => {
    return gulp.src(path.fonts)
        .pipe(gulp.dest(path.outputFonts));
});

gulp.task('moveImages', () => {
    return gulp.src(path.images)
        .pipe(gulp.dest(path.outputImages));
});

gulp.task('move', ['moveFonts', 'moveImages']);