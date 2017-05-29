import Ember from 'ember';
import ENV from '../config/environment';

// TODO: move this to util function and unit test
function processConfigParams (params) {
  // verify that webmap is a guid
  if (typeof params.webmap === 'string') {
    const webmapGuid = isGuid(params.webmap);
    if (!webmapGuid) {
      Ember.debug('Config Webmap ID not a guid');
      delete params.webmap;
    }
  } else {
    Ember.debug('Config Webmap ID not a string');
    delete params.webmap;
  }

  // verify that themeId is a guid
  if (typeof params.themeId === 'string') {
    const themeIdGuid = isGuid(params.themeId);
    if (!themeIdGuid) {
      Ember.debug('Config Theme ID not a guid');
      delete params.themeId;
    }
  } else {
    Ember.debug('Config Theme ID not a string');
    delete params.themeId;
  }

  // verify that geocodeUrl is a url
  if (typeof params.geocodeUrl === 'string') {
    const geocodeUrlValid = isUrl(params.geocodeUrl);
    if (!geocodeUrlValid) {
      Ember.debug('Config Geocode URL not a valid URL');
      delete params.geocodeUrl;
    }
  } else {
    Ember.debug('Config Geocode URL not a valid string');
    delete params.geocodeUrl;
  }

  return params;
}

function isGuid (stringToTest) {
  if (stringToTest[0] === '{') {
    stringToTest = stringToTest.substring(1, stringToTest.length - 1);
  }
  var regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}[-]?[0-9a-fA-F]{4}[-]?[0-9a-fA-F]{4}[-]?[0-9a-fA-F]{4}[-]?[0-9a-fA-F]{12}(\}){0,1}$/gi;
  return regexGuid.test(stringToTest);
}

function isUrl (stringToTest) {
  var regexUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z;0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
  return regexUrl.test(stringToTest);
}

export default Ember.Route.extend({
  itemsService: Ember.inject.service(),
  appSettings: Ember.inject.service(),
  queryParams: {'loc': {refreshModel: true}},
  esriLoader: Ember.inject.service('esri-loader'),

  renderTemplate (/*controller, model*/) {
    Ember.debug('IndexRoute::renderTemplate fired...');
    let errStatus = this.get('appSettings.errStatus');
    if (!errStatus) {
      this.render();
    } else {
      if (errStatus === 500) {
        this.render('gateway.error', {model: {status: errStatus}});
      } else {
        if (errStatus === 403) {
          this.render('gateway.403');
        }
        if (errStatus === 404 || errStatus === 400) {
          this.render('gateway.404');
        }
      }
    }
  },

  model (params) {
    // TODO Eventually, check if params.id === null, then make a
      // this.get('itemService').search(...) call to locate all the App Config Items for MyStreet.

    // read params from environment config
    const {
      geocodeUrl,
      themeId,
      webmap
    } = ENV.APP;
    const config = {
      geocodeUrl,
      themeId,
      webmap
    };

    return Ember.RSVP.hash({
      item: this.get('itemsService').getById(params.id),
      data: this.get('itemsService').getDataById(params.id),
    })
    .then((results) => {
      this.get('appSettings').set('settings', results);
      // mixin any missing params from enviornment config
      const params = processConfigParams(results.data.values);
      this.set('appSettings.settings.data.values', Object.assign(config, params));
      ENV.APP.geocodeUrl = params.geocodeUrl;
      this.get('appSettings').set('errStatus', null);
    //   return this.get('itemsService').getDataById(results.data.values.webmap)
    // })
    // .then((webmap) => {
    //   this.get('appSettings').set('settings.webmap', webmap);
    // })
      return Ember.RSVP.hash({
          item: this.get('itemsService').getById(results.data.values.webmap),
          itemData: this.get('itemsService').getDataById(results.data.values.webmap)
        });
      })
    .then((webmapResults) => {
      this.get('appSettings').set('settings.webmap', {});
      this.get('appSettings').set('settings.webmap.item', webmapResults.item);
      this.get('appSettings').set('settings.webmap.itemData', webmapResults.itemData);
    })
    .catch((err) => {
      this.get('appSettings').set('errStatus', err.code || 500);
      this.transitionTo('examples');
      Ember.debug('Error occured fetching the item: ' + JSON.stringify(err));
    });
  },

  // TODO: could move this inside the promise chain in model() right after this line:
  // this.get('appSettings').set('errStatus', null);
  afterModel () {
    const esriLoader = this.get('esriLoader');
    if (this.get('appSettings.settings.data.values.showMap') && !esriLoader.get('isLoaded')) {
      // will be showing a map, so lazy-load the JSAPI
      console.log('loading JSAPI');
      esriLoader.load({
        url: 'https://js.arcgis.com/3.20'
      }).catch(err => {
        // TODO: do something with the error
        Ember.debug(`application:route:renderTemplate:esriLoader error: ${err}`);
      });
    }
  }
});
