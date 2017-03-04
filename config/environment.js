/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'MyStreet',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      geocodeUrl: '', //'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find?text='
      webappId: '', // 40d2176ee0694c4ba2c6899aebd71f60
      themeId: '', // 283b7cf014394d7fab7b3fd5b4bd6aeb
    },

    torii: {
      sessionServiceName: 'session',
      providers: {
        'arcgis-oauth-bearer': {
          apiKey: 'J87zpPnTLsEthjDx', //QA App for Open Data Pages
          portalUrl: 'https://devext.arcgis.com'
          // portalUrl: 'https://qaext.arcgis.com'
          // portalUrl: 'https://www.arcgis.com'
        }
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    // ENV.APP.baseURL = 'opendatadev.arcgis.com';
    ENV.APP.baseURL = 'opendata.arcgis.com';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';
    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'surge') {
    // ENV.torii.providers['arcgis-oauth-bearer'].apiKey = 'dis8Iu8I0bACZOba';
    // ENV.torii.providers['arcgis-oauth-bearer'].portalUrl = 'https://devext.arcgis.com';
    ENV.APP.rootUrl = '/';
    ENV.APP.baseURL = 'opendata.arcgis.com';
  }

  // TODO setup dev/qa/prod environments for ENV.baseurl to point to api based on env (first use in data-citation)
      // see opendata-admin for example

  if (environment === 'qa') {
    ENV.APP.baseURL = 'opendataqa.arcgis.com';
    ENV.torii.providers.portalUrl = 'https://qaext.arcgis.com';
  }

  if (environment === 'production') {
    ENV.locationType = 'hash';
    ENV.rootURL = '/mystreet/';
    ENV.APP.baseURL = 'opendata.arcgis.com';
  }

  return ENV;
};
