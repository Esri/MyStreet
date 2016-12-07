import Ember from 'ember';

// Contextualizes calls to other services
export default Ember.Service.extend({
  appSettings: Ember.inject.service(),
  itemsService: Ember.inject.service(),
  featureService: Ember.inject.service(),
  geocodeService: Ember.inject.service(),

  /**
   * Promisified call to geocode-service to find an address
   */
  findLocationAddress (inputString) {
    return this.get('geocodeService').findLocationAddress(inputString)
      // TODO
      // .then((results) => {
        // manipulate raw response into what is needed in open-streets

      // })
      // handling of empty response object

      // .catch(err)
  }

});
