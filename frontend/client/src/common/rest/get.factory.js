/**
 * Created by Krtkoff on 13.12.2015.
 */
angular
    .module('aStream.commons')
    .factory('getter', getter);

/**
 *
 * @ngInject
 */
function getter($resource) {

    return $resource("http://83.167.252.142:5000/api/music/tree");

}