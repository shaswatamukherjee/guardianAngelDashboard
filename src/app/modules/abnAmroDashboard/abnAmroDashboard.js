import angular from 'angular';

export default angular.module('guardianAngelDashboard.main.abnAmroDashboard', [])
    .controller('abnAmroDashboard', abnAmroDashboard)

function abnAmroDashboard($scope, $window, commonService){
    var self = this;
    self.init = function () {
        console.log("Inside User Details");
        $window.setTimeout(function(){ self.getUserDetails(); },30000);
    };

    $scope.userList = [
        {
            id: 1,
            name: 'Ajay',
            location: 'Mumbai',
            status: 'Need Help'
        },{
            id: 2,
            name: 'Rishi',
            location: 'Netherland',
            status: 'Need Help'
        }
    ];

    self.getUserDetails = function(){
        commonServie.getCall();
    };
}