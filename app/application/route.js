import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  intl: Ember.inject.service(),
  openStreets: Ember.inject.service('open-streets'),

  beforeModel: function () {
    Ember.debug('applicationRoute::beforeModel...');

    this.get('openStreets').testFunc();

    // set base language to english, will need TODO build out alternative options
    const intl = this.get('intl');
    let defaultLocale = 'en-us';
    intl.setLocale(defaultLocale);
    // let translationKey = this._calculateTranslationKey(defaultLocale);

  },

  actions: {
    accessDenied: function () {
      // this.transitionTo('signin');
      this.transitionTo('index');
      console.log('access denied');
    },
    signout: function () {
      console.log('signout function');
      // depending on the type of auth, we need to do different things
      if (ENV.torii.providers['arcgis-oauth-bearer'].display && ENV.torii.providers['arcgis-oauth-bearer'].display === 'iframe') {
        // redirect the window to the signout url
        window.location = this.get('session.signoutUrl');
      } else {
        this.get('session').close();
      }
    }
  }
});
