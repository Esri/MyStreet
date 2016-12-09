import Ember from 'ember';

export default Ember.Controller.extend({
  appSettings: Ember.inject.service(),
  openStreets: Ember.inject.service(),
  address: "",
  returnedAddress: "",
  webmap: Ember.computed('appSettings.settings.webmap', function() {
    return this.get('appSettings.settings.webmap')
  }),
  bbox: Ember.computed('appSettings.settings.webmap', function() {
    return this.get('appSettings.settings.item.extent')
  }),

  init () {
    this._super.apply(this, arguments);
    // console.log(model);
    // console.log('appSettings from index controller', this.get('appSettings').get('settings'));
    console.log('indexcontroller :: webmap', this.get('webmap'));
    console.log('indexcontroller :: appSettings', this.get('appSettings'));
    console.log('indexcontroller :: bbox', this.get('bbox'));
  },

  searchAddress () {
    console.log(this.get('bbox'));
    return this.get('openStreets').findLocationAddress(this.get('address'), {'bbox': this.get('bbox')})
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
