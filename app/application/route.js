import Ember from 'ember';

export default Ember.Route.extend({
  intl: Ember.inject.service(),
  session: Ember.inject.service(),
  hostUrl: Ember.computed.reads('session.portalHostname'),
  appSettings: Ember.inject.service(),
  itemService: Ember.inject.service('items-service'),
  esriLoader: Ember.inject.service('esri-loader'),

  queryParams: {
    appid: {
      refreshModel: true
    }
  },

  beforeModel: function () {
    // set base language to english, will need TODO build out alternative options
    const intl = this.get('intl');
    let defaultLocale = 'en-us';
    intl.setLocale(defaultLocale);
    // let translationKey = this._calculateTranslationKey(defaultLocale);
  },

  renderTemplate: function () {
    // render the template as normal
    this._super(...arguments);
    // then preload the JSAPI
    this.get('esriLoader').load({
      url: 'https://js.arcgis.com/3.20'
    }).catch(err => {
      // do something with the error
      Ember.debug(`application:route:renderTemplate:esriLoader error: ${err}`);
    });
  },

  model (params) {
    if (params.appid) {
      this.transitionTo(`/${params.appid}`);
    }
  }
});
