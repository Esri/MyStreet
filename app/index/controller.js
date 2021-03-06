import { debug } from '@ember/debug';
import { alias } from '@ember/object/computed';
import { observer, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import ENV from '../config/environment';

export default Controller.extend({
  appSettings: service(),
  myStreet: service(),
  ajax: service(),
  portalUrl: ENV.torii.providers['arcgis-oauth-bearer'].portalUrl,

  queryParams: ['loc', 'themeId'],
  loc: "",
  themeId: "",
  changeLoc: observer('loc', 'appSettings.settings', function () {
    var loc = this.get('loc');
    if (loc) {
      this.set('address', loc);
      this._searchAddress();
    }
  }),

  address: "",
  returnedAddress: "",

  // TODO - bring in once the app is ready for geocoders
  // geocodeUrl: computed('appSettings.settings.data.values.geocodeUrl', function() {
  //   return this.get('appSettings.settings.data.values.geocodeUrl');
  // }),

  webmap: alias('appSettings.settings.webmap'),
  layers: alias('webmap.itemData.operationalLayers'),
  showMap: alias('appSettings.settings.data.values.showMap'),
  bbox: computed('appSettings.settings.item.extent', function() {
    return this.get('appSettings.settings.item.extent');
  }),

  configCssUrl: computed('session.portalHostname', 'appSettings.settings.data.values.themeId', function() {
    return `https://${this.get('session.portalHostname')}/sharing/rest/content/items/${this.get('appSettings.settings.data.values.themeId')}/resources/opendata.css.txt`
  }),
  configJsonUrl: computed('session.portalHostname', 'appSettings.settings.data.values.themeId', function() {
    return `https://${this.get('session.portalHostname')}/sharing/rest/content/items/${this.get('appSettings.settings.data.values.themeId')}/resources/theme.json`
  }),
  paramCssUrl: computed('themeId', function () {
    if (this.get('themeId')) {
      return `https://${this.get('session.portalHostname')}/sharing/rest/content/items/${this.get('themeId')}/resources/opendata.css.txt`
    }
  }),
  paramJsonUrl: computed('themeId', function () {
    if (this.get('themeId')) {
      return `https://${this.get('session.portalHostname')}/sharing/rest/content/items/${this.get('themeId')}/resources/theme.json`
    }
  }),

  init () {
    this._super(...arguments);
    this.setProperties({
      geocodedLocation: []
    });
    this.get('changeLoc');
  },

  _searchAddress (address) {
    const geocodeUrl = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/'; // use geocodeUrl for typeahead?
    // const geocodeUrl = this.get('geocodeUrl');

    let text = address;
    let bbox = this.get('bbox');
    let bb = {
      "xmin": bbox[0][0],
      "ymin": bbox[0][1],
      "xmax": bbox[1][0],
      "ymax": bbox[1][1],
    };
    let extent = `${bb.xmin},${bb.ymin},${bb.xmax},${bb.ymax}`;
    let searchString = `${geocodeUrl}suggest?text=${text}&searchExtent=${extent}&f=json`;
    return this.get('ajax').request(searchString)
  },

  _setAddress (address) {
    this.set('loc', address);
    let options = {
      bbox: this.get('bbox'),
    }

    // if (this.get('geocodeUrl')) { TODO - bring in once geocodeUrl is ready
    //   options.geocodeUrl = this.get('geocodeUrl');
    // }

    return this.get('myStreet').findLocationAddress(address, options)
      .then((results) => {
        this.setProperties({
          returnedAddress: results.candidates[0].address,
          geocodedLocation: [results.candidates[0].location.x, results.candidates[0].location.y]
        });
        this.get('appSettings').set('geometry', {});
        this.get('appSettings').set('geometry.returnedAddress', results.candidates[0].address);
        this.get('appSettings').set('geometry.geocodedLocation', [results.candidates[0].location.x, results.candidates[0].location.y]);
        return results;
      })
      .catch((err) => {
        this.set('returnedAddress','');
        debug('Error occured fetching the searched address: ' + JSON.stringify(err));
      });
  },

  afterModel () {
    this.set('loc', this.get('address'));
  },

  actions: {
    searchAddress (val) {
      return this._searchAddress(val);
    },
    onAddressChanged (val) {
      this._setAddress(val);
    },
  }

});
