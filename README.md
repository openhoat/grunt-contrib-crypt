## grunt-contrib-crypt

Grunt task to encrypt and decrypt files

## Usage

Encrypt files :

    $ grunt encrypt [--key mysecret]

Decrypt files :

    $ grunt decrypt [--key mysecret]

## Configuration

Put this in your grunt config :

    crypt:{
      files:[                                   // files to process
        {
          dir:'demo/src',                       // root dir of files to encrypt, or dest dir of files to decrypt
          include:'**/*.js',                    // pattern to include files
          encryptedDir:'demo/encrypted'         // dest dir of files to encrypt, or root dir of files to decrypt
        }
      ],
      options:{
        key:grunt.cli.options.key || 'somekey'  // key used to encrypt / decrypt
                                                // for security purpose, prefer to pass it through command line arguments
      }
    }

Same 'crypt' config object is used to encrypt and decrypt files.

Enjoy !