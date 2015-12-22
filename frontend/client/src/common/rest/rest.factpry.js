/**
 * Created by Krtkoff on 13.12.2015.
 */


angular
    .module('aStream.commons')
    .factory('rest', rest);

/**
 *
 * @ngInject
 */
function rest($resource, CONFIG) {

    return function(params){

        $resource(CONFIG.url + "/music/tree");


    };




}