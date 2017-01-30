import Ember from 'ember';
import ENV from '../config/environment';

// TODO: move this to util function and unit test
function processConfigParams (params) {
  // verify that webmap is a guid
  if (typeof params.webmap === 'string') {
    const webmapGuid = isGuid(params.webmap);
    if (!webmapGuid) {
      console.log('Webmap ID not a guid');
      delete params.webmap;
    }
  } else {
    console.log('Webmap ID not a string');
    delete params.webmap;
  }

  // verify that themeId is a guid
  if (typeof params.themeId === 'string') {
    const themeIdGuid = isGuid(params.themeId);
    if (!themeIdGuid) {
      console.log('Theme ID not a guid');
      delete params.themeId;
    }
  } else {
    console.log('Theme ID not a string');
    delete params.themeId;
  }

  // TODO 1) verify that passed in - Geocode Locator - geocodeUrl is actually a url
    // (then in model function set as .APP.geocodeUrl)

  // verify that geocodeUrl is a url
  if (typeof params.geocodeUrl === 'string') {
    const geocodeUrlValid = isUrl(params.geocodeUrl);
    if (!geocodeUrlValid) {
      console.log('Geocode URL not a valid URL');
      delete params.geocodeUrl;
    }
  } else {
    console.log('Geocode URL not a valid string');
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
      // this.get('itemService').search(...) call to locate all the App Config Items for Open Street.

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
      return this.get('itemsService').getDataById(results.data.values.webmap)
    })
    .then((webmap) => {
      this.get('appSettings').set('settings.webmap', webmap);
    })
    .catch((err) => {
      this.get('appSettings').set('errStatus', err.code || 500);
      this.transitionTo('examples');
      Ember.debug('Error occured fetching the item: ' + JSON.stringify(err));
    });
  },

});
