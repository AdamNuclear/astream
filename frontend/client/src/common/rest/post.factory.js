/**
 * Created by Krtkoff on 13.12.2015.
 */
angular
    .module('aStream.commons')
    .factory('post', post);

/**
 *
 * @ngInject
 */
function post() {

    return $resource("/api/posts/:id");

}