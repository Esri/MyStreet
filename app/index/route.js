import Ember from 'ember';
import ENV from '../config/environment';

// TODO: move this to util function and unit test
function processConfigParams (params) {
  // TODO the below variables are taken from financial-transparency app, and not applicable here, but
    // the pattern for converting / parsing may be useful
  // TODO - verify that passed in - Geocode Locator - geocodeUrl is actually a url
    // (then in model function set as .APP.geocodeUrl)

  // establish that themeId is a guid (globally unique id) - isGuid function

  return params;
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
        // TODO fix model pass in below
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
      webappId,
      themeId,
      webmap
    } = ENV.APP;
    const config = {
      geocodeUrl,
      webappId,
      themeId,
      webmap
    };

    // TODO: also validate appid is a guid

    return Ember.RSVP.hash({
      item: this.get('itemsService').getById(params.id),
      data: this.get('itemsService').getDataById(params.id),
    })
    .then((results) => {
      const params = processConfigParams(results.values);
      // mixin any missing params from enviornment config and return

      this.get('appSettings').set('settings', results);

      this.set('appSettings.config', Object.assign(config, params));

      console.log('appSettings', this.get('appSettings'));
      console.log('appSettings.settings', this.get('appSettings.settings'));
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
