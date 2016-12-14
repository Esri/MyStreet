import Ember from 'ember';

export default Ember.Controller.extend({
  appSettings: Ember.inject.service(),
  openStreets: Ember.inject.service(),
  address: "",
  returnedAddress: "",
  geocodedLocation: [],
  layers: Ember.computed('appSettings.settings.webmap.operationalLayers', function() {
    return this.get('appSettings.settings.webmap.operationalLayers')
  }),
  webmap: Ember.computed('appSettings.settings.webmap', function() {
    return this.get('appSettings.settings.webmap')
  }),
  bbox: Ember.computed('appSettings.settings.webmap', function() {
    return this.get('appSettings.settings.item.extent')
  }),

  init () {
    this._super.apply(this, arguments);
  },

  searchAddress () {
    return this.get('openStreets').findLocationAddress(this.get('address'), {'bbox': this.get('bbox')})
      .then((results) => {
        console.log('results from index controller search address:', results);
        this.set('returnedAddress', results.candidates[0].address);
        this.set('geocodedLocation', [results.candidates[0].location.x, results.candidates[0].location.y])
        return results;
      })
      .catch((err) => {
        // TODO why is this error returning, even with successful results
        Ember.debug('Error occured fetching the searched address: ' + JSON.stringify(err));
      });
  },

  actions: {
    onAddressChanged () {
      Ember.run.debounce(this, this.searchAddress, 500);
    }
  }

});
