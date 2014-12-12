'use strict';

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-mocha-test');

    return {
        alias: {
            'default': ['shell:browserify', 'watch'],
            'test': ['mochaTest:test']
        },
        pkg: grunt.file.readJSON('package.json'),
        mochaTest: {
            test: { src: ['tests/**/*.js'] }
        }
    };
};
