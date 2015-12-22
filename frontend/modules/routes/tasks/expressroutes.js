var path = require('path');

module.exports = function(grunt){

    grunt.registerMultiTask('expressroutes','Generate express routes',function(){

        var root   = path.resolve(process.cwd(), this.data.dir || '.'),
            target = path.resolve(process.cwd(), this.data.target || 'routes.js');

        function readdir(dir,list){
            list = list || [];
            grunt.file.recurse(dir,function(abspath, rootdir, subdir){

                subdir = subdir || '';

                var route = '/'+subdir.replace(/\\/g,'/');

                if (!subdir || list.indexOf(route)+1) {
                    return;
                }

                list.push(route);
            });
            return list;
        }

        grunt.file.write(target, JSON.stringify( readdir(root) ));
    });
};