//=require ../bower_components/angular/angular.js
//=require ../bower_components/angular-route/angular-route.js
//=require ../bower_components/angular-resource/angular-resource.js
//=require ../bower_components/angular-strap/dist/angular-strap.js
//=require ../bower_components/angular-strap/dist/angular-strap.tpl.js
//=require ../bower_components/angular-translate/angular-translate.js
//=require ../bower_components/angular-animate/angular-animate.js
//=require bower_components/cropit/dist/jquery.cropit.js
//=require bower_components/hammerjs/hammer.js
//=require bower_components/blueimp-load-image/js/load-image.all.min.js

//=require angular-1.2.7.js
//= require_tree lib
//= require_tree bootstrap-3
//= require_full_tree http
//= require_full_tree auth
//= require_self
//= require_tree components
//= require_full_tree views
//= require_full_tree controllers

//=require_full_tree core/components/auth
//=require_full_tree core/components/filters
//=require_full_tree core/components/user-management
//=require_full_tree core/components/login


'use strict'
var app = angular.module('brightlabs',
    [   ,'7-11-lucia-controllers'
        ,'ngRoute'
        ,'ngAnimate'
        ,'pascalprecht.translate'
        ,'smoothScroll'
    ]);


app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        //when('/', {controller:"initController",template:''}).
        when('/', {templateUrl: 'start.html', controller: 'startController', restrict: false}).
        when('/start', {templateUrl: 'start.html', controller: 'startController', restrict: false}).
        otherwise({redirectTo: '/'});
}]);



// Reenable ajax header in http requests
app.config(function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
});


var translations = {
    "NAME": "Namn"
}


app.config(['$translateProvider'
    , function($translateProvider) {

        $translateProvider
            .translations('sv', translations)
            .preferredLanguage('sv');

}]);
