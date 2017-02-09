import Ember from 'ember';

export default Ember.Controller.extend({
  appSettings: Ember.inject.service(),
  openStreets: Ember.inject.service(),

  queryParams: ['loc', 'themeId'],
  loc: "",
  themeId: "",
  changeLoc: Ember.observer('loc', 'appSettings.settings', function () {
    var loc = this.get('loc');
    if (loc) {
      this.set('address', loc);
      this._searchAddress();
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

  configCssUrl: Ember.computed('session.portalHostname', 'appSettings.settings.data.values.themeId', function() {
    return `https://${this.get('session.portalHostname')}/sharing/rest/content/items/${this.get('appSettings.settings.data.values.themeId')}/resources/opendata.css.txt`
  }),
  configJsonUrl: Ember.computed('session.portalHostname', 'appSettings.settings.data.values.themeId', function() {
    return `https://${this.get('session.portalHostname')}/sharing/rest/content/items/${this.get('appSettings.settings.data.values.themeId')}/resources/theme.json`
  }),
  paramCssUrl: Ember.computed('themeId', function () {
    if (this.get('themeId')) {
      return `https://${this.get('session.portalHostname')}/sharing/rest/content/items/${this.get('themeId')}/resources/opendata.css.txt`
    }
  }),
  paramJsonUrl: Ember.computed('themeId', function () {
    if (this.get('themeId')) {
      return `https://${this.get('session.portalHostname')}/sharing/rest/content/items/${this.get('themeId')}/resources/theme.json`
    }
  }),

  init () {
    this._super.apply(this, arguments);
    this.get('changeLoc');
  },

  _searchAddress (address) {
    return this.get('openStreets').findLocationAddress(address, {'bbox': this.get('bbox')})
      .then((results) => {
        console.log('results from fLA search addres::', results);
        return results;
      })
      .catch((err) => {
        // TODO why is this error returning, even with successful results
        Ember.debug('Error occured fetching the searched address: ' + JSON.stringify(err));
      });
  },

  _setAddress (address) {
    this.set('loc', address);
    return this.get('openStreets').findLocationAddress(address, {'bbox': this.get('bbox')})
      .then((results) => {
        console.log(results);
        console.log('geocoded0', this.get('geocodedLocation'));

        this.setProperties({
          returnedAddress: results.candidates[0].address,
          geocodedLocation: [results.candidates[0].location.x, results.candidates[0].location.y]
        });
        console.log('geocoded1', this.get('geocodedLocation'));

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
    searchAddress (val) {
      // Ember.run.debounce(this, this._searchAddress(val), 200);
      return this._searchAddress(val);
    },
    onAddressChanged (val) {
      this._setAddress(val);
    },
  }

});
