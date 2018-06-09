System.config({
    defaultJSExtensions: true,
    transpiler: "plugin-babel",
    babelOptions: {
        "optional": [
            "runtime",
            "optimisation.modules.system"
        ]
    },
    paths: {
        "npm:*": "node_modules/*",
        "module/": "app/modules/",
        "service/": "app/services/",
        "vendor/": "vendor/"
    },
    map: {
        "angular": "vendor/angular.js",
        "angular-animate": "vendor/angular-animate.js",
        "angular-busy": "vendor/angular-busy.js",
        "angular-ui-bootstrap": "vendor/ui-bootstrap-tpls.js",
        "angular-ui-router": "vendor/angular-ui-router.js",
        "app": "app/app.module.js",
        "jquery": "vendor/jquery.js",
        "moment": "vendor/moment.js",
        "angular-md5": "vendor/angular-md5.js",
        "plugin-babel": "vendor/plugin-babel.js",
        "systemjs-babel-build": "vendor/systemjs-babel-browser.js"
    },
    meta: {
        "angular": {
            format: "global"
        },
        "angular-animate": {
            format: "global"
        }
    }
});
