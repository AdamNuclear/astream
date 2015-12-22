/**
 * Created by Krtkoff on 12.12.2015.
 */
(function (angular) {

    'use strict';
angular
    .module('aStream.about')
    .config(aboutConfig);

/* @ngInject */
function aboutConfig($stateProvider) {
    $stateProvider
        .state( 'about', {
        url: '/about',
        views: {
            "main": {
                controller: 'aboutCtrl',
                templateUrl: 'about/about.tpl.html'
            }
        }
    });
}
})(window.angular);