## What's wbpjs?

![Wbpjs Logo](https://raw.github.com/openhoat/wbpjs/master/lib/public/icons/wbpjs-48x48.png)

  Web Boilerplate JS is a full stack web framework for nodejs.

  Its goal is to make friendly webapps building easy, without falling in a "quick & dirty" style.

  It is based on a plugin system to keep the solution strong and simple, whatever you need : simple http server, crud app with mongodb, multi server system, restful api, web sockets, or mobile site.

  Simply configure your app, and run it !

## Features

- mvc : controllers / models and views
- rendering powered by ejs
- mobile browser rendering
- restful support with xml, json, txt rendering
- lesscss support : compilation at bootstrap
- i18n integration
- persistence with mongoose (or mock for test purpose)
- crud controller and dao helpers

## Installation

The recommended way is through the excellent [NPM](http://www.npmjs.org/):

    $ npm install -g wbpjs

## Quick start

The simplest way to play with wbpjs is to generate a simple 'hello' web application :

Create the app:

    $ wbpjs ./hello

Start the server:

    $ cd ./hello
    $ node app

## Slow start

Hello webapp example in 7 steps :

1.  Create a new basedir webapp folder 'hello'
2.  Create a new file /hello/package.json :

        {
          "name": "hello",
          "version": "0.0.1",
          "dependencies": {
            "wbpjs": "*",
            "wbpjs-plugin-mvc":"*"
          }
        }

3.  Create a new file /hello/app.js :

        var wbp = require('wbpjs')
          , config = {
          plugins:{
            'mvc':{
              type:'mvc',
              config:{ locales:['en', 'fr'] }
            }
          }
        };
        wbp.start(config);

4.  Create a new controller file : /hello/controllers/main/index.js

        var wbp = require('wbpjs');

        module.exports = {
          // index is a keyword meaning 'index of the site'
          // wbpjs builds the site routes based on keywords and controller module name
          // example of values :
          //   config options : route (overrides the default) / prefix (add a route prefix)
          //   simple ops : get/post/put/head (http methods)
          //   crud ops : list/show/new/create/edit/remove/update (matching a model)
          index:function (req, res) {
            wbp.render(res, function (type) { // rendering engine based on type of view (html)
              var view = wbp.getWebView(req, 'main/index', type); // get the real matching view path
              res.render(view, { // effective rendering based on ejs templating
                title:__('Welcome') // this is the model (M of MVC) computed by i18n
              });
            });
          }
        };

5.  Create the view : /hello/views/main/index.html

        <!DOCTYPE html>
        <html>
        <head>
            <title>Hello - <%= title %></title>
            <meta charset="utf-8">
	        <link rel="stylesheet" href="/css/style.css" type="text/css" media="screen" />
        </head>
        <body>
            <h2>Hello</h2>
    		    <h3><%= title %></h3> <!-- Access to model -->
        </body>
        </html>

6.  Create the less css file : /hello/lesscss/style.less

        html { // Less syntax rocks
            body {
                width: 400px;
                background-color: #fefefe;
                h2 { color: blue; }
            }
        }

7. Run it :

        $ node app

Look at the [demos](https://github.com/openhoat/wbpjs/tree/master/demos) for examples of simple webapps.

Some other useful examples powered by wbpjs :
  - [wbpjs-todo](https://github.com/openhoat/wbpjs-todo/) : web responsive example, fully ajax, restful, with persistent model and web sockets [ [live demo](http://wbpjs-todo.labs.valtech-training.fr/) ]
  - [ifs](https://github.com/openhoat/ifs/) : instant file sharing web app with drag & drop and live connected users [ [live demo](http://ifs.labs.valtech-training.fr/) ]
  - [wbpjs-chat](https://github.com/openhoat/wbpjs-chat/) : live chat web application using web sockets [ [live demo](http://wbpjs-chat.labs.valtech-training.fr/) ]
  - [roulettejs](https://github.com/openhoat/roulettejs/) : webcam roulette web application using web sockets [ [live demo](http://roulettejs.labs.valtech-training.fr/) ]
  - [vhost-server](https://github.com/openhoat/vhost-server/) : virtual host proxy [ [live demo](http://labs.valtech-training.fr/) ]

Enjoy !
