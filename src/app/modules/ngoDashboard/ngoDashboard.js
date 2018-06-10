import angular from 'angular';

export default angular.module('guardianAngelDashboard.main.ngoDashboard', [])
    .controller('ngoDashboard', ngoDashboard)

function ngoDashboard($scope, $http) {
    var self = this;
    self.init = function () {
        self.getUserDetails();
        window.setTimeout(function(){ self.getUserDetails() },30000);
    };
    self.getUserDetails = function(){
        $http.get('https://prg5uzp18h.execute-api.eu-central-1.amazonaws.com/prod/getcustomerinneed')
            .then(response => $scope.userList = response.data)
            .catch(err => alert(err))
    };
    self.rescue = function (customer) {
        let postData = {
            data: customer
        };
        postData.data.activity = 'RESCUED';
        postData.data.customerResponse = 'Yes';
        postData.data.supportingNGO = 'AMREF';
        $http.put('https://prg5uzp18h.execute-api.eu-central-1.amazonaws.com/prod/updatestatus', postData)
            .then(() => {
                alert('The situation is understood and the victim is rescued');
                self.getUserDetails()
            });
    };
}
