import angular from 'angular';
import moment from 'moment';
import 'service/dataAccessUtils.js';

export default angular.module("directive.calendar", [
    'service.dataAccessUtils'
])
    .directive("calendar", function($rootScope, dataAccessUtilsService, $interpolate, spinnerService, $q) {
        return {
            restrict: "E",
            templateUrl: "app/directives/calendar/calendar.html",
            scope: {
                empid: "=",
                selected: "="
            },
            link: function(scope) {
                scope.years = [];
                scope.months = [
                    {name: 'January', value: 0},
                    {name: 'February', value: 1},
                    {name: 'March', value: 2},
                    {name: 'April', value: 3},
                    {name: 'May', value: 4},
                    {name: 'June', value: 5},
                    {name: 'July', value: 6},
                    {name: 'August', value: 7},
                    {name: 'September', value: 8},
                    {name: 'October', value: 9},
                    {name: 'November', value: 10},
                    {name: 'December', value: 11}
                ];
                const currentYear = parseInt(scope.selected.format('YYYY'));
                for(let i = -2; i <= 2; i++) {
                    scope.years.push(currentYear + i);
                }

                scope.currentDate = moment();
                scope.selectMonth = scope.currentDate.month();
                scope.selectYear = scope.currentDate.format('YYYY');
                var start = scope.currentDate.date(1);

                scope.month = scope.currentDate.clone();

                _buildMonth(scope, start, scope.month, true);

                scope.changeMonth = function(m) {
                    const changedMonth = moment(new Date(scope.selectYear, m, 1));
                    scope.month = changedMonth.clone();
                    _buildMonth(scope, changedMonth, scope.month, false);
                };

                scope.changeYear = function(y) {
                    const changedYear = moment(new Date(y, scope.selectMonth, 1));
                    scope.month = changedYear.clone();
                    _buildMonth(scope, changedYear, scope.month, true);
                };
            }
        };

        function _buildMonthDetails(scope, start, month) {
            scope.weeks = [];
            var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
            let weekStartDate = date.clone().weekday(0);
            while (!done) {
                scope.weeks.push({ days: _buildWeek(scope, weekStartDate, month) });
                date.add(1, "w");
                weekStartDate = date.clone().weekday(0);
                done = count++ > 2 && monthIndex !== weekStartDate.month();
                monthIndex = weekStartDate.month();
            }
        }

        function _buildMonth(scope, start, month, getLeaveRequired) {
            if(getLeaveRequired) {
                scope.holidays = {};
                $rootScope.resetError();
                let spinnerPromise = $q.defer();
                scope.$parent.cgBusyCalendarOptions = spinnerService.activateSpinner(spinnerPromise.promise, 'Please wait while we retrieve the leave information.');
                _getLeaveDetails({employeeid: scope.empid}, {year: start.format('YYYY')})
                    .then((response) => {
                        if(angular.isDefined(response.data.output) && angular.isDefined(response.data.output.message) && (['ERROR', 'WARNING'].indexOf(response.data.output.message.messageType) > -1)) {
                            $rootScope.reportError(response);
                        } else {
                            const res = response.data.output.response;
                            for (let i = 0; i < res.length; i++) {
                                scope.holidays[res[i].date] = res[i].typeOfLeave;
                            }
                            _buildMonthDetails(scope, start, month);
                        }
                    })
                    .catch(err => $rootScope.reportError(err))
                    .finally(() => {
                        self.loadScreen = true;
                        spinnerService.deactivateSpinner(spinnerPromise);
                    });
            } else {
                _buildMonthDetails(scope, start, month);
            }
        }

        function _buildWeek(scope, date, month) {
            var days = [];
            for (var i = 0; i < 7; i++) {
                days.push({
                    name: date.format("dd").substring(0, 1),
                    number: date.date(),
                    isCurrentMonth: date.month() === month.month(),
                    isToday: date.isSame(new Date(), "day"),
                    date: date
                });
                date = date.clone();
                date.add(1, "d");
            }
            days = _assignHolidays(scope, days);
            return days;
        }

        function _assignHolidays(scope, days) {
            for(let i = 0; i < days.length; i++) {
                const currDate = days[i].date.format("DD-MM-YYYY");
                if(angular.isDefined(scope.holidays) && angular.isDefined(scope.holidays[currDate])) {
                    days[i].holidayType = scope.holidays[currDate];
                } else {
                    continue;
                }
            }
            return days;
        }

        function _getLeaveDetails (empid, additionalParams) {
            return dataAccessUtilsService.httpRequest({
                url: $interpolate('/getCalendarOverview/{{employeeid}}')(empid),
                method: 'GET',
                params: additionalParams
            });
        }
    })
    .name;