import angular from 'angular';
import keywordSearch from './keywordSearch';
import tweets from './tweets';

export default angular.module('guardianAngelservice', [])
    .service('commonService', commonService);

function commonService($http) {
    var self = this;
    self.processData = function() {
        console.log(tweets);
        self.retrieveFeedSuccess({data: tweets});
    };
    self.retrieveFeedSuccess = function (response) {
        var naturalDisaster_keywords = keywordSearch;
        var trend = response.data[0].trends;
        let name = [];
        for(var i = 0;i < trend.length; i++){
            name[i] = trend[i].name.toLowerCase();
        }
        let alertNews =[];
        for(var j = 0; j < naturalDisaster_keywords.length; j++){
            for(var k = 0; k < name.length; k++){
                if(name[k].indexOf(naturalDisaster_keywords[j]) != -1){
                    alertNews.push(name[k]);
                }
            }
        }
        self.customers = [];
        if(alertNews.length > 0) {
            self.collateCustomerInformation();
        }
    };
    self.collateCustomerInformation = function () {
        $http.get('https://prg5uzp18h.execute-api.eu-central-1.amazonaws.com/prod/getcustomer')
            .then(self.collateCustomerInformationSuccess);
    };
    function S4() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    self.collateCustomerInformationSuccess = function(res) {
        self.customers = res.data.filter(value => {
            return value.customerLocation === '23424834'
        });
        angular.forEach(self.customers, function (value, key) {
            var guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
            self.customers[key] = {
                "eventId": guid,
                "customerName": value.customerName,
                "location": value.customerLocation,
                "description": "The customer is stuck in flood",
                "activity": "MESSAGE_SENT"
            };
        });
        var postData = {data: self.customers};
        $http.post('https://prg5uzp18h.execute-api.eu-central-1.amazonaws.com/prod/logrescuedetails', postData)
            .then(function (res) {
                console.log(res);
            });
    }
}