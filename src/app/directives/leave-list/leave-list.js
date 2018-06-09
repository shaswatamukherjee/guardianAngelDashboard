import angular from 'angular';
import 'service/dataAccessUtils.js';

export default angular.module('resourceManagement.leaveList', [
    'service.dataAccessUtils'
])
    .directive('leaveList', ($rootScope, dataAccessUtilsService, $interpolate, spinnerService, $q) => {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/leave-list/leave-list.html',
            scope: {
                empid: '@'
            },
            link: (scope) => {
                let spinnerPromise = $q.defer();
                scope.cgBusyOptions = spinnerService.activateSpinner(spinnerPromise.promise, 'Please wait while we retrieve the leave information.');
                scope.getLeaveList = function(empid, additionalParams) {
                    return dataAccessUtilsService.httpRequest({
                        url: $interpolate('/getLeaveCredits/{{employeeid}}')(empid),
                        method: 'GET',
                        params: additionalParams
                    });
                };
                $rootScope.resetError();
                scope.getLeaveList({employeeid: scope.empid})
                    .then((response) => {
                        if(angular.isDefined(response.data.output) && angular.isDefined(response.data.output.message) && (['ERROR', 'WARNING'].indexOf(response.data.output.message.messageType) > -1)) {
                            $rootScope.reportError(response);
                        } else {
                            scope.leaves = response.data.output.response
                        }
                    })
                    .catch(err => $rootScope.reportError(err))
                    .finally(() => {
                        spinnerService.deactivateSpinner(spinnerPromise);
                    });

            },
            controller: function ($rootScope, $scope) {
                $rootScope.stateObject = $rootScope.stateObject || {};

                $scope.applyLeave = function (type) {
                    $rootScope.stateObject.typeOfLeave = type;
                    $rootScope.transitionTo('main.applyLeave');
                }
            }
        }
    })
    .name;