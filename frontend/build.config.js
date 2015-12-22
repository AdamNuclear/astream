/**
 * Created by Krtkoff on 6.12.2015.
 */


module.exports = {


    app_dir:     'client/src',
    build_dir:   'build',
    compile_dir: 'bin',
    vendor_dir:  'client/vendor',


    app_files: {
        js: [ '**/*.module.js', '**/*.config.js', '**/*.js'],

        atpl: [ 'app/**/*.tpl.html' ],
        ctpl: [ 'common/**/*.tpl.html' ],

        index: [ 'index.html' ],
        sass: 'sass/main.scss'
    },


    vendor_files: {
        js: [
            'angular/angular.js',
            'angular-ui-router/release/angular-ui-router.js',
            'angular-bootstrap/ui-bootstrap.js',
            'angular-bootstrap/ui-bootstrap-tpls.js',
            'angular-resource/angular-resource.js'

        ],
        css: [
            'angular-bootstrap/ui-bootstrap-csp.css'
        ],
        assets: [
        ]
    }
};