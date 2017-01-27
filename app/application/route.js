import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  intl: Ember.inject.service(),
  session: Ember.inject.service(),
  hostUrl: Ember.computed.reads('session.portalHostname'),
  appSettings: Ember.inject.service(),
  itemService: Ember.inject.service('items-service'),

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

  model (params) {
    if (params.appid) {
      this.transitionTo(`/${params.appid}`);
    }
  }
});
