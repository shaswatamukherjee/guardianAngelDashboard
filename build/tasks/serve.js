const gulp = require('gulp');
const browserSync = require('browser-sync');
const app = require('../../server');
const proxyPort = 51234;
const restifyServer = require('../../test/stubserver/stubserver.js');
const ftServer = require('../../serviceProxyServer')(proxyPort);

gulp.task('browser-sync', function () {
    browserSync.init(null, {
        open: false,
        port: 9000,
        server: {
            baseDir: 'dist',
            index: 'index.html'
        }
    });
});

gulp.task('stubserver', ['build', 'watch'], (done) => {
    restifyServer.listen('8080', () => {
        console.log('%s listening at %s', restifyServer.name, restifyServer.url);
    });
    done();
});

gulp.task('bs-serve', ['build', 'watch','browser-sync']);

gulp.task('express-serve', ['build'], (done) => {
    app.listen(process.env.PORT || 8080);
    console.log('App is listening on ', process.env.PORT || 8080);
    done();
});

gulp.task('ft-serve', ['stubserver'], (done) => {
    ftServer.server.listen(process.env.PORT || proxyPort);
    console.log('App is listening on ', process.env.PORT || proxyPort);
    done();
});