/**
 * Created by Krtkoff on 12.12.2015.
 */
(function (angular) {

    'use strict';
angular
    .module('aStream.home')
    .config(aboutConfig);

/* @ngInject */
function aboutConfig($stateProvider) {
    $stateProvider
        .state( 'home', {
        url: '/',
        views: {
            "main": {
                controller: 'homeCtrl',
                templateUrl: 'home/home.tpl.html'
            }
        }
    });
}
})(window.angular);