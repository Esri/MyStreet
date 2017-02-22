/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here

    sassOptions: {
      includePaths: [
        'node_modules/bootstrap-sass/assets/stylesheets',
        'node_modules/calcite-bootstrap/dist/sass',
      ]
    },

    amd : {
      // Specify the type of AMD loader. Either a CDN path or a local loader ('dojo' or 'requirejs')
      // NOTE: not using compact b/c we're loading webmaps and JSAPI will want ALL the modules
      loader: 'https://js.arcgis.com/3.19/',
      // user defined AMD packages to search for in application
      packages: [
        'esri','dojo','dojox','dijit',
        'put-selector','xstyle','dgrid'
      ],
      // Required the AMD configuration file path relative to the project root.
      // The file will be copied to the output directory (./dist) and the configuration file
      // will be loaded before the loader is loaded. The configuration file must define the global variable used by the specific loader.
      // For dojo, the supported global variable name are `dojoConfig`, `djConfig` or `require`.
      // For requirejs, the global variable is called `require`.
      // Please refer to the documentation for the correct use of the configuration object.
      configPath: 'config/dojo-config.js'
    }
  });

  app.import('./bower_components/typeahead.js/dist/typeahead.jquery.js');
  app.import('./bower_components/colorspaces/colorspaces.js');

  var extraAssets = new Funnel('./node_modules/bootstrap-sass/assets/fonts/bootstrap', {
    srcDir: '/',
    include: ['**.*'],
    destDir: '/assets/fonts',
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree(extraAssets);
};
