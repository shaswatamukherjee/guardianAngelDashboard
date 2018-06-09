const distOutput = require('../paths').outputSource;
const gulp = require('gulp');
const del = require('del');

gulp.task('clean', (callback) => {
    return del([distOutput], callback);
});