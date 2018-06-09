var gulp = require('gulp');
var paths = require('../paths');
var browserSync = require('browser-sync');

function changed(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('watch', () => {
    gulp.watch( paths.app.scripts , [ 'compile-js']).on('change', changed);
    gulp.watch( paths.app.templates , [ 'compile-html']).on('change', changed);
    gulp.watch( paths.app.less , [ 'compile-style']).on('change', changed);
});