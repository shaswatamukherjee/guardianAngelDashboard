import angular from 'angular';

export default angular.module('directive.employeeCard', [])
.directive('employeeCard', () => {
    return {
        restrict: 'E',
        templateUrl: 'app/directives/employee-card/employee-card.html',
        scope: {
            employee: '='
        },
        link: (scope) => {
            angular.forEach(scope.employee.authRules, function (value) {
                if(value.rule === 'PROFILE_VIEW') {
                    scope.employee.isProfileViewAllowed = value.value;
                } else if(value.rule === 'TIMESHEET_EDIT') {
                    scope.employee.isTimesheetAllowed = value.value;
                }
            });
            if(scope.employee.gender === 'M') {
                scope.employee.genderImg = './images/male.png';
            } else {
                scope.employee.genderImg = './images/female.png';
            }
        },
        controller: ($rootScope, $scope) => {
            $scope.gotoProfile = function (empId) {
                $rootScope.transitionTo('main.onboard', {id: empId});
            };
            $scope.gotoTimesheet = function (empId) {
                $rootScope.transitionTo('main.timesheet', {id: empId});
            };
        }
    }
})
    .name;