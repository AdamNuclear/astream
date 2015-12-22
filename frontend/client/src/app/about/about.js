/**
 * Created by Krtkoff on 12.12.2015.
 */

angular
    .module('aStream.about')
    .controller('aboutCtrl', aboutCtrl);

/* @ngInject */
function aboutCtrl( $scope ) {

    $scope.hello = 'hellllloooooo';
console.log('WHUA');
}