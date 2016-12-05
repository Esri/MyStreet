import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Route.extend({
  intl: Ember.inject.service(),
  itemsService: Ember.inject.service('items-service'),
  featureService: Ember.inject.service('feature-service'),

  model (params) {
    console.log(params);
    return this.get('itemsService').getById;
  },

  beforeModel: function () {
    // set base language to english, will need TODO build out alternative options
    const intl = this.get('intl');
    let defaultLocale = 'en-us';
    intl.setLocale(defaultLocale);
    // let translationKey = this._calculateTranslationKey(defaultLocale);

    let params = {'id': '5'};
    this.model(params);

    let itemsService = this.get('itemsService')
    let featureService = this.get('featureService')

    console.log('itemsService', itemsService);
    console.log('featureService', featureService);

    // return both item and its data, based on request of guid/route id
      // abstract into open-streets service, to get the app config and xhr requests for the data/item
      // ^established in sites-service for opendata-ui



    // console.log('function', this.get('itemsService').getById);


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
