import { debug } from '@ember/debug';
import { alias } from '@ember/object/computed';
import { observer, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
// import ENV from '../config/environment';

export default Controller.extend({
  // appSettings: service(),
  // myStreet: service(),
  // ajax: service(),
  // portalUrl: ENV.torii.providers['arcgis-oauth-bearer'].portalUrl,

  // webmap: alias('appSettings.settings.webmap'),
  // layers: alias('webmap.itemData.operationalLayers'),
  // showMap: alias('appSettings.settings.data.values.showMap'),
  //
  // configCssUrl: computed('session.portalHostname', 'appSettings.settings.data.values.themeId', function() {
  //   return `https://${this.get('session.portalHostname')}/sharing/rest/content/items/${this.get('appSettings.settings.data.values.themeId')}/resources/opendata.css.txt`
  // }),
  // configJsonUrl: computed('session.portalHostname', 'appSettings.settings.data.values.themeId', function() {
  //   return `https://${this.get('session.portalHostname')}/sharing/rest/content/items/${this.get('appSettings.settings.data.values.themeId')}/resources/theme.json`
  // }),
  // paramCssUrl: computed('themeId', function () {
  //   if (this.get('themeId')) {
  //     return `https://${this.get('session.portalHostname')}/sharing/rest/content/items/${this.get('themeId')}/resources/opendata.css.txt`
  //   }
  // }),
  // paramJsonUrl: computed('themeId', function () {
  //   if (this.get('themeId')) {
  //     return `https://${this.get('session.portalHostname')}/sharing/rest/content/items/${this.get('themeId')}/resources/theme.json`
  //   }
  // }),

  init () {
    this._super(...arguments);
    // this.get('changeLoc');
    console.log(this.get('model'));
    // debugger;
  },

  // afterModel () {
  //   this.set('loc', this.get('address'));
  // },

  actions: {
    // searchAddress (val) {
    //   return this._searchAddress(val);
    // },
    // onAddressChanged (val) {
    //   this._setAddress(val);
    // },
  }

});
