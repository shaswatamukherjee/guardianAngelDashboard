import angular from 'angular';

export default angular.module('guardianAngelDashboard.main.abnAmroDashboard', [])
    .controller('abnAmroDashboard', abnAmroDashboard)

function abnAmroDashboard($scope, $http){
    var self = this;
    self.init = function () {
        self.getCustomerInNeedDetails();
        window.setTimeout(function(){ self.getCustomerInNeedDetails() },30000);
    };
    self.getCustomerInNeedDetails = function(){
        $http.get('https://prg5uzp18h.execute-api.eu-central-1.amazonaws.com/prod/getcustomerinneed')
            .then(response => $scope.userList = response.data)
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
                alert('The situation is reported to the available NGOs');
                self.getCustomerInNeedDetails()
            });
    };
    self.cancelCustomerAlert = function (customer) {
        let postData = {
            data: customer
        };
        postData.data.activity = 'CANCEL_ALERT';
        $http.put('https://prg5uzp18h.execute-api.eu-central-1.amazonaws.com/prod/updatestatus', postData)
            .then(() => {
                alert('The alert is cancelled for the customer');
                self.getCustomerInNeedDetails()
            });
    }
}