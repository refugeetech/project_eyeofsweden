'use strict'
var services = angular.module('7-11-lucia-services',
    ['ngResource']);

services.factory('Submission',function($resource){
    var serviceObj = $resource('api/submission/:id',{},{query:{method:"GET",isArray:true}, update:{method:"PUT"}});
    return serviceObj;
});

services.factory("RegisterHook", function() {
    return function(name, scope, callback) {
        var results = [];

        (function traverse(scope) {
            if (!scope) {
                return;
            }

            if (_.has(scope, name)) {
                results.push(scope[name]());
            }

            traverse(scope.$$childHead);
            traverse(scope.$$nextSibling);
        })(scope.$$childHead);

        return callback(results);
    }
});