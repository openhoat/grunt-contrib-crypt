var path = require('path')
  , fs = require('fs')
  , kruptosUtilCrypt = require('../node_modules/kruptos/lib/kruptos-util-crypt');

function isFileAndNotInModules(file) {
  return file.indexOf('node_modules/') !== 0 && fs.lstatSync(file).isFile();
}

module.exports = function (grunt) {
  "use strict";
  grunt.registerTask('encrypt', 'Encrypt files and folders', function () {
    var files = grunt.config('crypt').files
      , options = grunt.config('crypt').options
      , cryptKey = options.key;
    files.forEach(function (file) {
      var srcDir = file.dir || 'src'
        , encDir = file.encDir || srcDir 
        , encryptedExtension = file.encryptedExtension || '.encrypted'
        , include = file.include || '*.js'
        , filePaths = grunt.file.expand({ filter:'isFile', cwd:srcDir }, include);
      filePaths.forEach(function (filePath) {
        var srcFilePath, destFilePath, decryptedContent, encryptedContent;
        if (path.extname(filePath) === encryptedExtension) {
          return;
        }
        srcFilePath = path.join(srcDir, filePath);
        destFilePath = path.join(encDir, filePath) + encryptedExtension;
        try {
          grunt.log.writeln('Encrypting ' + srcFilePath.cyan + ' -> ' + destFilePath.cyan);
          decryptedContent = grunt.file.read(srcFilePath);
          encryptedContent = kruptosUtilCrypt.encryptText(decryptedContent, cryptKey);
          grunt.file.write(destFilePath, encryptedContent);
        } catch (e) {
          grunt.log.error(e);
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
      var srcDir = file.dir || 'src'
        , encDir = file.encDir || srcDir
        , encryptedExtension = file.encryptedExtension || '.encrypted'
        , filePaths = grunt.file.expand({ filter:isFileAndNotInModules, cwd:encDir }, '**/*' + encryptedExtension);
      filePaths.forEach(function (filePath) {
        var srcFilePath = path.join(encDir, filePath)
          , destFilePath = path.join(srcDir, filePath).substring(0, srcFilePath.length - encryptedExtension.length)
          , decryptedContent, encryptedContent;
        try {
          grunt.log.writeln('Decrypting ' + srcFilePath.cyan + ' -> ' + destFilePath.cyan);
          encryptedContent = grunt.file.read(srcFilePath);
          decryptedContent = kruptosUtilCrypt.decryptText(encryptedContent, cryptKey);
          grunt.file.write(destFilePath, decryptedContent);
        } catch (e) {
          grunt.log.error();
          grunt.verbose.error(e);
          grunt.fail.warn('Decrypt operation failed.');
        }
      });
    });
  });
};