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
  findLocationAddress (inputString, options) {
    // let options = {
    //   // Cali coordinates in object form
    //   bbox:{
    //     "xmin": -118.9138,
    //     "ymin": 33.7148,
    //     "xmax": -117.5735,
    //     "ymax": 34.3895,
    //     "spatialReference": {
    //       "wkid": 3395
    //     }
    //   }
      // Cali coordinates in string form
      // bbox: "-118.9138,33.7148,-117.5735,34.3895"
    // }

    // if passed in extent is an array, turn it into an object that geocode-service will be able to read
    if (options.bbox[0]) {
      options.bbox = {
        "xmin": options.bbox[0][0],
        "ymin": options.bbox[0][1],
        "xmax": options.bbox[1][0],
        "ymax": options.bbox[1][1],
      }
    }

    return this.get('geocodeService').findLocationAddress(inputString, options)
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
