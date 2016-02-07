// register the interceptor as a service
angular.module('brightlabs-http', ['angular-growl'])
.factory('brightlabsHttpInterceptor', function($q,$rootScope,growl,$window) {
    return {
//        optional method
        'request': function(config) {
            // do something on success
            return config || $q.when(config);
        },

        // optional method
        'requestError': function(rejection) {
            // do something on error
//            if (canRecover(rejection)) {
//                return responseOrNewPromise
//            }
            $rootScope.$broadcast('http:requestError');
            return $q.reject(rejection);
        },



        // optional method
        'response': function(response) {
            // do something on success
            return response || $q.when(response);
        },

        // optional method
        'responseError': function(rejection) {
            // do something on error
//            if (canRecover(rejection)) {
//                return responseOrNewPromise
//            }

            if(rejection.status==0){  //Spring security dont allow us to do this, show login
                $window.href = "/"
            }

            if(rejection.status==0){  //client do not have a connection with backend i.e user is offline
                growl.addErrorMessage("SERVER_ERROR.COULD_NOT_COMMUNICATE_WITH_SERVER")
            }

            if(rejection.status==501){  //Server timed out
                growl.addErrorMessage("SERVER_ERROR.A_TIMEOUT_OCCURED")
            }
            else if(rejection.status>=500){ //Server errors
                growl.addErrorMessage("SERVER_ERROR.UNKOWN_ERROR_OCCURED")
            }

            $rootScope.$broadcast('http:responseError');
            return $q.reject(rejection);
        }
    };
})
.config(function($httpProvider,growlProvider){
    $httpProvider.interceptors.push('brightlabsHttpInterceptor');
    growlProvider.globalTimeToLive(2000);
    growlProvider.onlyUniqueMessages(true);
})