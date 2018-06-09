import angular from 'angular';

export default angular.module('guardianAngelDashboard.main.ngoDashboard', [])
    .controller('ngoDashboard', ngoDashboard)

function ngoDashboard($rootScope, $scope, commonService, $window) {
    var self = this;
    self.init = function () {
        console.log("Inside init");
        $window.setTimeout(function(){ self.getUserDetails(); },30000);
    };

    $scope.userList = [
        {
            id: 1,
            name: 'Ajay',
            location: 'Mumbai',
            status: 'Need Help'
        }, {
            id: 2,
            name: 'Rishi',
            location: 'Netherland',
            status: 'Need Help'
        }
    ];

    self.getUserDetails = function(){
        console.log("Get User Details");
        commonService.getCall();
    };

    self.updateStatus = function(){
      commonService.updateCall();
    };
}
