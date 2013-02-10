var path = require('path')
  , crypto = require('crypto');

function encryptText(text, key) {
  var cipher = crypto.createCipher('aes-256-cbc', key)
    , crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decryptText(text, key) {
  var decipher = crypto.createDecipher('aes-256-cbc', key)
    , dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

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
          encryptedContent = encryptText(content, cryptKey);
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
          content = decryptText(encryptedContent, cryptKey);
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