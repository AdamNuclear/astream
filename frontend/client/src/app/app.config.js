/**
 * Created by Krtkoff on 8.12.2015.
 */
(function (angular) {

    'use strict';
angular
    .module('aStream')
    .config(appConfig)
    .run(appRun);

/* @ngInject */
function appConfig($urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/404');
}

/* @ngInject */
function appRun($http) {
    // Do not cache requests by default (problem with IE & 304 responses (MOB-24209)
    $http.defaults.headers.common['Cache-Control'] = 'no-cache';
    $http.defaults.headers.common['Pragma'] = 'no-cache';
}
})(window.angular);