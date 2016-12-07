import Ember from 'ember';

// Contextualizes calls to other services
export default Ember.Service.extend({
  appSettings: Ember.inject.service(),
  itemsService: Ember.inject.service(),
  featureService: Ember.inject.service(),
  geocodeService: Ember.inject.service(),

  // Webmap: 39b2d247f702476e8575d02c0e05d0a9
  testFunc () {
    Ember.debug('**Test Function from open-streets service**');
  },

  findLocationAddress (inputString) {
    this.get('geocodeService').findLocationAddress(inputString);
  }

});
