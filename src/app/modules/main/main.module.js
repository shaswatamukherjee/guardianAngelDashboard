import angular from 'angular';

export default angular.module('guardianAngelDashboard.main', [])
    .controller('mainController', mainController);

function mainController($rootScope, $scope, commonService, $window) {
    var self = this;

    self.init = function(){
        commonService.processData();
        $window.setTimeout(function(){commonService.processData},60000);
        self.buttonIndicator = true;
        self.labelIndicator = true;
    };

    $scope.tabClicked = function (item) {
        if(item === 1) {
            item = 'ngoDashboard';
            self.buttonIndicator = false;
            self.labelIndicator = false;
        }else{
            item = 'abnAmroDashboard';
            self.buttonIndicator = false;
            self.labelIndicator = true;
        }
        $scope.selectedListItem = item;
        $scope.transitionTo('main.' + item);
    };
}