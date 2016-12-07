import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  intl: Ember.inject.service(),

  beforeModel: function () {
    // set base language to english, will need TODO build out alternative options
    const intl = this.get('intl');
    let defaultLocale = 'en-us';
    intl.setLocale(defaultLocale);
    // let translationKey = this._calculateTranslationKey(defaultLocale);

  },

  actions: {
  }
});
