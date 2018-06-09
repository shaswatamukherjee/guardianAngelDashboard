import angular from 'angular';
import 'service/dataAccessUtils.js';

export default angular.module('directive.holidayList', [
    'service.dataAccessUtils'
])
    .directive('holidayList', ($rootScope, dataAccessUtilsService, $interpolate, spinnerService, $q) => {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/holiday-list/holiday-list.html',
            scope: {
                currentYear: '@',
                empid: '@'
            },
            link: function (scope) {
                const currentYear = parseInt(scope.currentYear);
                scope.holidayYears = [currentYear - 1, currentYear, currentYear + 1];
                scope.getHolidayList = function(empid, additionalParams) {
                    return dataAccessUtilsService.httpRequest({
                        url: $interpolate('/getHolidayList/{{employeeid}}')(empid),
                        method: 'GET',
                        params: additionalParams
                    });
                };
                $rootScope.resetError();
                let spinnerPromise = $q.defer();
                scope.cgBusyOptions = spinnerService.activateSpinner(spinnerPromise.promise, 'Please wait while we retrieve the holiday list.');
                scope.getHolidayList({employeeid: scope.empid}, {year: currentYear})
                    .then((response) => {
                        if(angular.isDefined(response.data.output) && angular.isDefined(response.data.output.message) && (['ERROR', 'WARNING'].indexOf(response.data.output.message.messageType) > -1)) {
                            $rootScope.reportError(response);
                        } else {
                            scope.holidayList = response.data.output.response
                        }
                    })
                    .catch(err => $rootScope.reportError(err))
                    .finally(() => spinnerService.deactivateSpinner(spinnerPromise));
            },
            controller: function ($rootScope, $scope) {
                $rootScope.stateObject = $rootScope.stateObject || {};

                $scope.activateYear = function(index) {
                    $scope.activeHolidayYearIndex = index;
                    let spinnerPromise = $q.defer();
                    $scope.cgBusyOptions = spinnerService.activateSpinner(spinnerPromise.promise, 'Please wait while we retrieve the holiday list.');
                    $scope.getHolidayList({employeeid: $scope.empid}, {year: $scope.holidayYears[index]})
                        .then((response) => {
                            if(angular.isDefined(response.data.output) && angular.isDefined(response.data.output.message) && (['ERROR', 'WARNING'].indexOf(response.data.output.message.messageType) > -1)) {
                                $rootScope.reportError(response);
                            } else {
                                scope.holidayList = response.data.output.response
                            }
                        })
                        .catch(err => $rootScope.reportError(err))
                        .finally(() => spinnerService.deactivateSpinner(spinnerPromise));
                };
            }
        }
    })
    .name;