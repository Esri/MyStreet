import { reads } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  intl: service(),
  session: service(),
  hostUrl: reads('session.portalHostname'),
  appSettings: service(),
  itemService: service('items-service'),

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
