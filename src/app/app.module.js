import angular from 'angular';
import 'angular-ui-router';
import 'module/main/main.module.js';
import 'module/abnAmroDashboard/abnAmroDashboard.js';
import 'module/ngoDashboard/ngoDashboard.js';
import 'module/alert/alert.js';
import 'service/service.js';
import 'service/spinner.js';
import 'angular-busy';
import messages from './messages.js';
import 'jquery';

angular.module('guardianAngelDashboard', [
    'ui.router',
    'cgBusy',
    'guardianAngelDashboard.main',
    'guardianAngelDashboard.main.abnAmroDashboard',
    'guardianAngelDashboard.main.ngoDashboard',
    'service.spinner',
    'guardianAngelservice',
    'alert'
])
    .config(($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/main');

        $stateProvider
            .state('main', {
                url: '/main',
                templateUrl: 'app/modules/main/main.module.html',
                params: {stateObject: {}}
            })
            .state('main.abnAmroDashboard', {
                url: '/abnAmroDashboard',
                templateUrl: 'app/modules/abnAmroDashboard/abnamroDashboard.html',
                params: {stateObject: {}}
            })
            .state('main.ngoDashboard', {
                url: '/ngoDashboard',
                templateUrl: 'app/modules/ngoDashboard/ngoDashboard.html',
                params: {stateObject: {}}
            })
            .state('alert', {
                url: '/alert?id',
                templateUrl: 'app/modules/alert/alert.html',
                params: {stateObject: {}}
            })
    })
    .controller('guardianAngelDashboardController', guardianAngelDashboardController)


function guardianAngelDashboardController($rootScope, $scope, $state) {
    let self = this;
    self.showError = false;
    self.showSuccess = false;
    self.activateMessages = true;
    $rootScope.messages = messages;
    $scope.stateObject = {};
    $rootScope.transitionTo = function(nextState, param) {
        if(param) {
            param.stateObject = $rootScope.stateObject;
        } else {
            param = {stateObject: $rootScope.stateObject};
        }
        $state.transitionTo(nextState, param);
    };
    $rootScope.reportError = function (err) {
        let error = [];
        if(err.data !== null && angular.isDefined(err.data.output) && angular.isDefined(err.data.output.message)) {
            error.push($rootScope.messages[err.data.output.message.messageCode]);
        } else {
            error.push('Service Unreachable');
        }
        self.showError = true;
        self.errorMessage = error.join('\n');
    };
    $rootScope.resetError = function () {
        self.showError = false;
    };
    $rootScope.reportSuccess = function (msg) {
        self.showSuccess = true;
        self.successMessage = msg;
    };
    $rootScope.hideSuccess = function () {
        self.showSuccess = false;
    };
}

angular.bootstrap(document, ['guardianAngelDashboard']);