import Ember from 'ember';

// Contextualizes calls to other services
export default Ember.Service.extend({
  appSettings: Ember.inject.service(),
  itemsService: Ember.inject.service('items-service'),
  featureService: Ember.inject.service('feature-service'),

  // Webmap: 39b2d247f702476e8575d02c0e05d0a9
  testFunc () {
    Ember.debug('**Test Function from open-streets service**');
  },

  beforeModel: function () {
    // let initializationPromises = {
      // i18nStatus: this._initI18n(),
      // sessionStatus: this._initSession()
    // }

    // return Ember.RSVP.hashSettled(initializationPromises)
    // .then((/*results*/) => {
    //   // now we fire off the site fetch (this needed)
    //   return this.get('appSettings').initializeSite();
    // })
    // .then(() => {
    //   this._addSiteLinksJson();
    //   return;
    // })
    // .catch((err) => {
    //   Ember.debug('Error occured initializing the app ' + JSON.stringify(err));
    // });
  },

  model () {
  // we do this so we have the Site as the model in renderTemplate
    console.log('111appsettings', this.get('appSettings').get('site'));
    return this.get('appSettings').get('site');
  },

});
