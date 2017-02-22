import Ember from 'ember';
import arcgisUtils from 'esri/arcgis/utils';

export default Ember.Component.extend({
  classNames: ['web-map'],

  init () {
    this._super(...arguments);
    this.set('mapElementId', `${this.elementId}map`);
  },

  didInsertElement () {
    this._super(...arguments);

    this._createMap(this.get('mapElementId'));
  },


  _createMap (elementId) {
    const itemInfo = this.get('itemInfo');
    const itemId = this.get('itemId');

    arcgisUtils.createMap(itemInfo || itemId, elementId);
  }
});
