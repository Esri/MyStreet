import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  intl: Ember.inject.service(),
  portalService: Ember.inject.service(),

  model (params) {
    console.log(params);
    return this.get('portalService').getById(params.id);
  },

  beforeModel: function () {
    // set base language to english, will need TODO build out alternative options
    const intl = this.get('intl');
    let defaultLocale = 'en-us';
    intl.setLocale(defaultLocale);
    // let translationKey = this._calculateTranslationKey(defaultLocale);

    let params = {'id': '5'};
    this.model(params);

    // console.log(this.get('portalService').portalRestUrl);
    console.log(this.get('portalService').portalUrl);
    console.log(this.get('portalService').request('opendata.arcgis.com'));
    console.log(this.get('portalService').getById('100'));


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
