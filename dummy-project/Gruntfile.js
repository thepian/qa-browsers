'use strict';

module.exports = function(grunt) {

  // Project Config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    exec: {
      hello: {
        cmd:"echo hello"
      }
    }

  });

  grunt.loadNpmTasks('grunt-exec');

  // Default Task
  grunt.registerTask('default', ['exec:hello']);
};