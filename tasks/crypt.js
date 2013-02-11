var path = require('path')
  , kruptosUtilCrypt = require('../node_modules/kruptos/lib/kruptos-util-crypt');

module.exports = function (grunt) {
  "use strict";
  grunt.registerTask('encrypt', 'Encrypt files and folders', function () {
    var files = grunt.config('crypt').files
      , options = grunt.config('crypt').options
      , cryptKey = options.key;
    files.forEach(function (file) {
      var srcDir = file.dir || 'src'
        , destDir = file.encryptedDir || path.join('encrypted', srcDir)
        , include = file.include || '*.js'
        , filePaths = grunt.file.expand({ cwd:srcDir }, include);
      filePaths.forEach(function (filePath) {
        var srcFilePath = path.join(srcDir, filePath)
          , destFilePath = path.join(destDir, filePath)
          , content, encryptedContent;
        try {
          grunt.log.write('Encrypting "' + srcFilePath + '" to "' + destFilePath + '"...');
          content = grunt.file.read(srcFilePath);
          encryptedContent = kruptosUtilCrypt.encryptText(content, cryptKey);
          grunt.file.write(destFilePath, encryptedContent);
          grunt.log.ok();
        } catch (e) {
          grunt.log.error();
          grunt.verbose.error(e);
          grunt.fail.warn('Encrypt operation failed.');
        }
      });
    });
  });
  grunt.registerTask('decrypt', 'Decrypt files and folders', function () {
    var files = grunt.config('crypt').files
      , options = grunt.config('crypt').options
      , cryptKey = options.key;
    files.forEach(function (file) {
      var destDir = file.dir || 'src'
        , srcDir = file.encryptedDir || path.join('encrypted', destDir)
        , include = file.include || '*.js'
        , filePaths = grunt.file.expand({ cwd:srcDir }, include);
      filePaths.forEach(function (filePath) {
        var srcFilePath = path.join(srcDir, filePath)
          , destFilePath = path.join(destDir, filePath)
          , content, encryptedContent;
        try {
          grunt.log.write('Decrypting "' + srcFilePath + '" to "' + destFilePath + '"...');
          encryptedContent = grunt.file.read(srcFilePath);
          content = kruptosUtilCrypt.decryptText(encryptedContent, cryptKey);
          grunt.file.write(destFilePath, content);
          grunt.log.ok();
        } catch (e) {
          grunt.log.error();
          grunt.verbose.error(e);
          grunt.fail.warn('Decrypt operation failed.');
        }
      });
    });
  });
};