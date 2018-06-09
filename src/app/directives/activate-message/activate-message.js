import angular from 'angular';

export default angular.module("directive.activateMessage", [])
    .directive("activateMessage", function() {
        return {
            restrict: "E",
            templateUrl: "app/directives/activate-message/activate-message.html",
            scope: {
                showError: "=",
                errorMessage: "=",
                showSuccess: "=",
                successMessage: "="
            }
        };
    })
    .name;