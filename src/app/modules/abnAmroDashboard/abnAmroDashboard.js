import angular from 'angular';
import locations from '../../messages';

export default angular.module('guardianAngelDashboard.main.abnAmroDashboard', [])
    .controller('abnAmroDashboard', abnAmroDashboard)

function abnAmroDashboard($scope, $http){
    var self = this;
    self.locations = locations;
    $scope.activity = {
        'MARK_SAFE': {
            'true': 'Safe',
            'false': 'Mark Safe'
        }
    };
    self.init = function () {
        self.getCustomerInNeedDetails();
        window.setTimeout(function(){ self.getCustomerInNeedDetails() },30000);
    };
    self.getCustomerInNeedDetails = function(){
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
    self.raiseAlertMessage = function (custId) {
        $http.post('https://prg5uzp18h.execute-api.eu-central-1.amazonaws.com/prod/notifycustomer', {})
            .then(() => alert('Alerts are raised.'))
            .catch(() => alert('Key invalid '));
    };
    self.sendAlertToNGO = function (customer) {
        let postData = {
            data: customer
        };
        postData.data.activity = 'REPORT_TO_NGO';
        postData.data.description = 'NA';
        postData.data.customerResponse = 'Yes';
        postData.data.supportingNGO = 'NA';
        $http.put('https://prg5uzp18h.execute-api.eu-central-1.amazonaws.com/prod/updatestatus', postData)
            .then(() => {
                self.getCustomerInNeedDetails()
            });
        $http.post('https://prg5uzp18h.execute-api.eu-central-1.amazonaws.com/prod/notifyembassy', {})
            .then(function (res) {
                console.log(res);
            });
        $http.post('https://prg5uzp18h.execute-api.eu-central-1.amazonaws.com/prod/notifyngo', {})
            .then(function (res) {
                console.log(res);
            });
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