import angular from 'angular';
import locations from '../../messages';

export default angular.module('guardianAngelDashboard.main.ngoDashboard', [])
    .controller('ngoDashboard', ngoDashboard)

function ngoDashboard($scope, $http) {
    var self = this;
    $scope.isMarkSafeDisabled = false;
    self.locations = locations;
    $scope.activity = {
        'MARK_SAFE': {
            'true': 'Safe',
            'false': 'Mark Safe'
        }
    };
    self.init = function () {
        self.getUserDetails();
        window.setTimeout(function(){ self.getUserDetails() },30000);
    };
    self.getUserDetails = function(){
        $http.get('https://prg5uzp18h.execute-api.eu-central-1.amazonaws.com/prod/getcustomerinneed')
            .then(response => {
                $scope.userList = response.data;
                $scope.userList.map((value) => {
                    if(value.activity === 'RESCUED') {
                        return value.isMarkSafeDisabled = true;
                    } else {
                        return value.isMarkSafeDisabled = false;
                    }
                })
            })
            .catch(err => alert(err))
    };
    self.rescue = function (customer) {
        let postData = {
            data: customer
        };
        delete postData.data.isMarkSafeDisabled;
        postData.data.activity = 'RESCUED';
        postData.data.customerResponse = 'Yes';
        postData.data.supportingNGO = 'AMREF';
        $http.put('https://prg5uzp18h.execute-api.eu-central-1.amazonaws.com/prod/updatestatus', postData)
            .then(() => {
                customer.isMarkSafeDisabled = true;
                self.getUserDetails()
            });
    };
}
