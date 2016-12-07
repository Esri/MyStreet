import Ember from 'ember';

export default Ember.Controller.extend({
  appSettings: Ember.inject.service(),
  openStreets: Ember.inject.service(),
  address: "",
  returnedAddress: "",
  webmap: Ember.computed('appSettings.settings.webmap', function() {
    return this.get('appSettings.settings.webmap')
  }),

  init () {
    this._super.apply(this, arguments);
    // console.log(model);
    // console.log('appSettings from index controller', this.get('appSettings').get('settings'));
  },

  searchAddress () {
    return this.get('openStreets').findLocationAddress(this.get('address'))
      .then((results) => {
        console.log('results from index controller search address function:', results);
        this.set('returnedAddress', results.locations[0].name);
        return results;
      })
      .catch((err) => {
        Ember.debug('Error occured fetching the searched address: ' + JSON.stringify(err));
      });

    // TODO - bbox will come from the app config - for v0.0, leave it out to get the component working...
  },

  actions: {
    onAddressChanged () {
      Ember.run.debounce(this, this.searchAddress, 500);
    }
  }

});
