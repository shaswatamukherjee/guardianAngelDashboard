import angular from 'angular';

export default angular.module('main.alert', [])
    .controller('alertController', alertController)

function alertController() {
    var self = this;

    self.updateStatus = function(status){
        if(status) {
            alert('Thanks. We will ensure that you are safe. We will publish your location for urgent help. Be patient and dont panic.');
        } else {
            alert('Thanks for your valuable time.');
        }
    };
}
