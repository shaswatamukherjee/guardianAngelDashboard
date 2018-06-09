import angular from 'angular';

export default angular.module('service.spinner', [])
    .service('spinnerService', spinnerService)
    .name;

function spinnerService() {
    this.activateSpinner = function (promise, message) {
        return {
            promise: promise,
            message: message,
            backdrop: true
        };
    };

    this.deactivateSpinner = function (promise) {
        promise.resolve();
    };
}