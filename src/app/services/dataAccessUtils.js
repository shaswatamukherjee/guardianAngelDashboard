import angular from 'angular';

export default angular.module('service.dataAccessUtils', [])
    .service('dataAccessUtilsService', dataAccessUtilsService);

function dataAccessUtilsService($rootScope, $http) {
    this.httpRequest = function (config, options) {
        $rootScope.resetError();
        config.headers = config.headers || {};
        let configParams = config.params;
        let queryParam = [];
        angular.forEach(configParams, (value, key) => {
            queryParam.push(key + '=' + value);
        });
        config.headers.endpointUrl = 'http://n02ast0013:48185' + config.url + '?' + queryParam.join('&');
        config.headers.RESTMethod = config.method;
        config.url = '/itrack/ServiceProxy?_=' + new Date().valueOf();
        config.method = 'POST';
        return $http(config);
    };
}