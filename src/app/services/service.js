import angular from 'angular';
import keywordSearch from './keywordSearch';

export default angular.module('guardianAngelservice', [])
    .service('commonService', commonService);

function commonService($http) {
    var self = this;
    self.processData = function(){
        console.log("Inside processData");
        var naturalDisaster_keywords = keywordSearch;

            $http({
                method: 'GET',
                url: 'https://api.twitter.com/1.1/trends/place.json?id=23424834',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'OAuth oauth_consumer_key=\"nu5RwvfWVP0f0x3Tmf5rAN6yc\",oauth_token=\"2990171611-G2lDri1GNuVWebiyHbmaUOGtbKVISGkLIpkg6ah\",oauth_signature_method=\"HMAC-SHA1\",oauth_timestamp=\"1528519352\",oauth_nonce=\"0p602v\",oauth_version=\"1.0\",oauth_signature=\"qWf868sAu7Q7jkLY47zHoJQfBFs%3D\"',
                    'cache-control': 'no-cache',
                    'postman-token': '063cbe18-4ff8-ad1f-c90e-e9ff43e05162'
                }
            }).then(function (response) {
                data = response.data[0].trends;
                var name = [];
                for(i=0;i<data.length;i++){
                    name[i] = data[i].name.toLowerCase();
                }
                var alertNews =[];
                for(j=0;j<naturalDisaster_keywords.length;j++){
                    for(k=0;k<name.length;k++){
                        if(name[k].indexOf(naturalDisaster_keywords[j]) != -1){
                            alertNews.push(name[k]);
                        }
                    }
                }
                self.customers = [];
                if(alertNews.length > 0) {
                    $http.get('https://prg5uzp18h.execute-api.eu-central-1.amazonaws.com/prod/getcustomer')
                        .then(function(res) {
                            self.customers = res.data.filter(function (value) {
                                return value.customerLocation === '23424834'
                            });
                            self.customers.map(function (value) {
                                return {
                                    "eventId": "adasdk32fasjnk",
                                    "customerName": value.customerName,
                                    "location": value.location,
                                    "description": "The customer is stuck in flood",
                                    "activity": "MESSAGE_SENT"
                                };
                            });
                            var postData = {data: $scope.customers};
                            $http.post('https://prg5uzp18h.execute-api.eu-central-1.amazonaws.com/prod/logrescuedetails', postData)
                                .then(function (res) {
                                    console.log(res);
                                })
                        });
                }
            }, function (response) {
                console.log("Error"+response)
            });
        };
}