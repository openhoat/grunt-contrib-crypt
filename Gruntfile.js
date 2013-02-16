/*global top: true, jasmine: true */

var fs = require('fs')
  , path = require('path');

module.exports = function (grunt) {
  var gruntConfig;
  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask('default', 'clean decrypt');
  gruntConfig = {
    pkg:'<json:package.json>',
    clean:{
      'default':['demo/src']
    },
    crypt:{
      files:[
        {
          dir:'demo',
          include:'**/*.js',
          encryptedExtension:'.encrypted'
        }
      ],
      options:{
        key:grunt.cli.options.key || 'somekey'
      }
    }
  };
  grunt.initConfig(gruntConfig);
};