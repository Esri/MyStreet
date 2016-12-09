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
    let ops = {
      // Cali coordinates in object form
      // bbox:{
      //   "xmin": -118.9138,
      //   "ymin": 33.7148,
      //   "xmax": -117.5735,
      //   "ymax": 34.3895,
      //   "spatialReference": {
      //     "wkid": 3395
      //   }
      // }
      // Cali coordinates in string form
      // bbox: "-118.9138,33.7148,-117.5735,34.3895"
    }

    return this.get('geocodeService').findLocationAddress(inputString, ops)
      .catch((err) => {
        console.log(err);
      })
      // TODO
      // .then((results) => {
        // manipulate raw response into what is needed in open-streets

      // })
      // handling of empty response object

      // .catch(err)
  }
});
