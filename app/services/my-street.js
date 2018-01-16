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
    // if passed in extent is an array, turn it into an object that geocode-service will be able to read
    if (options.bbox[0]) {
      options.bbox = {
        "xmin": options.bbox[0][0],
        "ymin": options.bbox[0][1],
        "xmax": options.bbox[1][0],
        "ymax": options.bbox[1][1],
      }
    }

    // set default locations greater than 1, so that dropdown autocomplete receives more than 1 geocoded address
    options.maxLocations = 4;

    return this.get('geocodeService').findLocationAddress(inputString, options)
      .catch((err) => {
        console.log('geoCodeSerivce:error::', err);
      })
      // TODO
      // .then((results) => {
        // manipulate raw response into what is needed in my-street

      // })
      // handling of empty response object

      // .catch(err)
  }
});
