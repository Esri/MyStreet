import Ember from 'ember';

export default Ember.Controller.extend({
  appSettings: Ember.inject.service(),
  openStreets: Ember.inject.service(),

  queryParams: ['loc'],
  loc: "",
  changeLoc: Ember.observer('loc', 'appSettings.settings', function () {
    var loc = this.get('loc');
    if (loc) {
      this.set('address', loc);
      this.searchAddress();
    }
  }),

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

  cssUrl: Ember.computed('session.portalHostname', 'appSettings.settings.data.values.themeId',function() {
    return `https://${this.get('session.portalHostname')}/sharing/rest/content/items/${this.get('appSettings.settings.data.values.themeId')}/resources/opendata.css.txt`
  }),

  init () {
    this._super.apply(this, arguments);
    this.get('changeLoc');
  },

  searchAddress () {
    this.set('loc', this.get('address'));
    return this.get('openStreets').findLocationAddress(this.get('address'), {'bbox': this.get('bbox')})
      .then((results) => {
        this.set('returnedAddress', results.candidates[0].address);
        this.set('geocodedLocation', [results.candidates[0].location.x, results.candidates[0].location.y])
        return results;
      })
      .catch((err) => {
        // TODO why is this error returning, even with successful results
        Ember.debug('Error occured fetching the searched address: ' + JSON.stringify(err));
      });
  },

  afterModel () {
    this.set('loc', this.get('address'));
  },

  actions: {
    onAddressChanged () {
      Ember.run.debounce(this, this.searchAddress, 500);
    },
    onClearedAddress() {
      this.set('address', "");
      this.set('returnedAddress', "");
      this.set('loc', "");
    }
  }

});
