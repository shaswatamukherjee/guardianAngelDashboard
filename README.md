Resource Management (iTrack)
====================

This project is used to perform the following:
    *Apply Leaves (Annual Leaves, On Duty, Comp Off, Overtime, Maternity Leaves)
    *Fill and submit Timesheet
    *Fill and submit timesheets for your group
    *Onboard Employees

Setup of the application:
========================

```
    .
    |- build
    |- dist (*)
    |- node_modules (*)
    |- images
    |- src
        |- app
            |- directives
                |- **
                    |- **
            |- modalTemplates
                |- **
                    |- **
            |- modules
                |- **
                    |- **
            |- services
                |- *.js
            |- app.module.js
            |- messages.js
    |- styles
    |- test
    |- gulpfile.js
    |- index.html
    |- package.json
    |- README.md
    |- server.js
    |- serviceProxyServer.js
    |- systemjs.config.js
```
Folders marked with '(*)' are generated during the build.
```
    The entire project is built using ES6 modules. So the module loading is also done in the same way.
    For example:
    import 'angular' from angular;

    Here 'angular' is the name of the module and angular is the name of the package as mentioned in systemjs.config.js
```

/build
-------
Contains all set of tasks needed by the gulpfile to render the dist folder or start local server. If there is any dependency that needs
to be installed from npm then please add that dependency in the /build/paths.js under vendor --> js. If this task is missed then the dist
will not contain the new file.

/dist
-------
Contains the deployable content.

/images
-------
Contains all the images that is required by the project.

/src/app/directives
-------
Contains all the directives required by the modules.

/src/app/modalTemplates
-------
Contains all the popups

/src/app/modules
-------
Contains all the pages and its required javascripts

/src/app/services
-------
Contains all the shared tasks that is consumed by the modules

/styles
------
Contains all the css, less and sass files. For generic styling, make all changes in strap.less

/test/stubserver
------
Contains all the corresponding routes, so that if a service request is made then some stub response is returned.

/test/response
------
Contains all the response json for the services

/messages.js
------
Contains the error messages based on the codes returned by the services

Naming Convention
=================

Generic:
* File names should all be in small case/lower camel casing
Directives:
* Folder names should be like directive or directive-name
* File names should be <folder-name>.{js/html}
* Module names should be directive.<folderName>
Modules:
* Folder names should follow lower camelCase
* File names should be <folderName>.module.{js/html}
* Module names should be <mainState>.'**'.<folderName>
Services:
* File names should follow lower camelCase
* Module names should be service.<folderName>

Running on Local
================
1. Clone the repository using git clone <repo url>
2. Run npm i
3. Modify the /src/app/services/dataAccessUtils.js to the below code
    ```
        import angular from 'angular';

        export default angular.module('service.dataAccessUtils', [])
            .service('dataAccessUtilsService', dataAccessUtilsService);

        function dataAccessUtilsService($rootScope, $http) {
            this.httpRequest = function (config, options) {
                $rootScope.resetError();
                return $http(config);
            };
        }
    ```
    Please revert the changes when you are building the application for deployment.
4. Run 'gulp ft-serve'

Creating a package for deployment
=================================
1. Run 'gulp build'
2. Once build says 'Finished Build', then break.
3. Copy the /dist and modify the /dist/index.html. Update:
    <base href="/itrack/">
4. Copy the entire project from UT tomcat and then replace the UT package with the files/folders from /dist
5. Never remove the WEB-INF files from the package

Deploying the package
=====================
The package would be deployed on UT Tomcat. Replace the content from /webapps/itrack with the above formed content.


