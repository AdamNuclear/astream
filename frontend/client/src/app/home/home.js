/**
 * Created by Krtkoff on 12.12.2015.
 */

angular
    .module('aStream.home')
    .controller('homeCtrl', homeCtrl);

/* @ngInject */
function homeCtrl( $scope, getter ) {

    getter.get().$promise.then(function(res){
        $scope.music = res.music;
    });

}