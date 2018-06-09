import angular from 'angular';

export default angular.module('service.authentication', [])
    .service('authenticationService', authenticationService)
    .name;

function authenticationService() {
    this.setAuthRule = function (user) {
        sessionStorage.setItem('user', user);
    };

    this.setUserDetails = function (details) {
        sessionStorage.setItem('role', details.role);
        sessionStorage.setItem('empName', details.empName);
        sessionStorage.setItem('approver', details.approver);
    };

    this.getUserDetails = function () {
        return {
            empid: sessionStorage.getItem('empId'),
            empName: sessionStorage.getItem('empName'),
            role: sessionStorage.getItem('role'),
            approver: sessionStorage.getItem('approver')
        };
    };

    this.resetAuth = function () {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('authenticate');
    };

    this.getEmpid = function () {
        if(angular.isDefined(sessionStorage.getItem('user'))) {
            return atob(sessionStorage.getItem('user'));
        } else {
            return '';
        }
    };

    this.isUserAuthenticated = function () {
        if(sessionStorage.getItem('user')) {
            return true;
        } else {
            return false;
        }
    };
}