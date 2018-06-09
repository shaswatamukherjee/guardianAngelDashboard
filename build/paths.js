module.exports = {
    vendor: {
        js: [
            'node_modules/core-js/client/shim.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/angular/angular.js',
            'node_modules/angular-animate/angular-animate.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'node_modules/systemjs-plugin-babel/plugin-babel.js',
            'node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
            'node_modules/moment/moment.js',
            'node_modules/jquery/dist/jquery.js',
            'node_modules/@cgross/angular-busy/angular-busy.js',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
            'node_modules/angular-md5/angular-md5.js'
        ]
    },
    app: {
        templates: [
            'src/**/*.html',
            'index.html',
            'node_modules/@cgross/angular-busy/angular-busy.html'
        ],
        scripts: [
            'src/**/*.js',
            'systemjs.config.js'
        ],
        css: [
            'styles/*.css',
            'node_modules/bootstrap3/dist/css/bootstrap.css',
            'node_modules/font-awesome/css/font-awesome.css',
            'node_modules/@cgross/angular-busy/angular-busy.css',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css'
        ],
        less: [
            'styles/*.less'
        ],
        sass: [
            'styles/*.scss'
        ],
        json: [
            'src/**/*.json'
        ]
    },
    fonts: [
        'node_modules/font-awesome/fonts/*.*',
        'node_modules/bootstrap3/dist/fonts/*.*'
    ],
    images: [
        'images/*.*'
    ],
    outputSource: 'dist/',
    outputVendor: 'dist/vendor/',
    outputCss: 'dist/styles/',
    outputFonts: 'dist/fonts/',
    outputImages: 'dist/images/'
};