/**
 * Created by Krtkoff on 8.12.2015.
 */
(function () {
    'use strict';

    angular
        .module('aStream', [
            'ui.router',
            'ui.bootstrap',

            'templates-app',
            'templates-common',

            'aStream.about',
            'aStream.home',

            'aStream.commons'

        ]);
})();