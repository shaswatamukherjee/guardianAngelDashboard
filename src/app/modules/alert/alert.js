import angular from 'angular';

export default angular.module('alert', [])
    .controller('alert', alert)

function alert(commonService, $stateParams) {
    var self = this;
    self.init = function () {
        console.log("Inside Alert : - "+ $stateParams.id);

    };

    self.getCall = function(){
        commonService.getDetails();
    };

    self.updateStatus = function(status){
        commonService.updateCall();
    };
}
