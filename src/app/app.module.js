import angular from 'angular';
import 'angular-ui-router';
import 'module/main/main.module.js';
import 'module/abnAmroDashboard/abnAmroDashboard.js';
import 'module/alert/alert.js';
import 'service/service.js';

angular.module('guardianAngelDashboard', [
    'ui.router',
    'guardianAngelDashboard.main',
    'guardianAngelDashboard.main.abnAmroDashboard',
    'guardianAngelservice',
    'main.alert'
])
    .config(($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/main');

        $stateProvider
            .state('main', { url: '/main', templateUrl: 'app/modules/main/main.module.html' })
            .state('main.abnAmroDashboard', { url: '/abnAmroDashboard', templateUrl: 'app/modules/abnAmroDashboard/abnAmroDashboard.html' })
            .state('main.alert', { url: '/alert?id', templateUrl: 'app/modules/alert/alert.html' })
    })
    .controller('guardianAngelDashboardController', guardianAngelDashboardController);

function guardianAngelDashboardController($rootScope, $scope, $state) {
    $scope.stateObject = {};
    $rootScope.transitionTo = function(nextState, param) {
        if(param) {
            param.stateObject = $rootScope.stateObject;
        } else {
            param = {stateObject: $rootScope.stateObject};
        }
        $state.transitionTo(nextState, param);
    };
}

angular.bootstrap(document, ['guardianAngelDashboard']);