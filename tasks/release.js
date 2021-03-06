var shell = require('shelljs');
var semver = require('semver');
var _ = require('underscore');

module.exports = function(grunt) {

    function run(cmd, msg) {
        shell.exec(cmd, {silent:true});
    }

    grunt.registerTask('release', 'update .json files, git tags', function (type) {

        // defaults
        var files = {
            pkg: 'package.json',
            bower: 'bower.json',
            manifest: 'extension/manifest.json'
        };
        var pkg = grunt.file.readJSON(files.pkg);
        var newVersion = semver.inc(pkg.version, type || 'patch');

        var bower = grunt.file.readJSON(files.bower);
        var manifest = grunt.file.readJSON(files.manifest);

        // Update bower
        grunt.log.write('bower.json: ' + bower.version);
        bower.version = newVersion;
        grunt.log.writeln(' -> ' + bower.version);
        grunt.file.write(files.bower, JSON.stringify(bower, null, '  '));

        // Update manifest.json
        grunt.log.write('manifest.json: ' + manifest.version);
        manifest.version = newVersion;
        grunt.log.writeln(' -> ' + manifest.version);
        grunt.file.write(files.manifest, JSON.stringify(manifest, null, '  '));

        // Update package.json
        grunt.log.write('package.json: ' + pkg.version);
        pkg.version = newVersion;
        grunt.log.writeln(' -> ' + pkg.version);
        grunt.file.write(files.pkg, JSON.stringify(pkg, null, '  '));

        grunt.log.ok('Updated json files.');

        run('git add ' + _.values(files).join(' '));
        run('git commit -m "release ' + newVersion + '"');
        run('git tag ' + newVersion);
        run('git push origin master');
        run('git push origin --tags');

        grunt.log.ok('Updated git version.');
    });
};
