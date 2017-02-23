import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['web-map'],

  arcgisMapService: Ember.inject.service('arcgis-map-service'),

  init () {
    this._super(...arguments);
    this.set('mapElementId', `${this.elementId}map`);
  },

  didInsertElement () {
    this._super(...arguments);

    // create the map _after_ the element has been inserdted into the DOM
    const arcgisMapService = this.get('arcgisMapService');
    const mapElementId = this.get('mapElementId');
    const itemInfo = this.get('itemInfo');
    const itemId = this.get('itemId');
    arcgisMapService.createMap(itemInfo || itemId, mapElementId);
  },

  willDestroyElement() {
    this._super(...arguments);

    // destroy the map _before_ removing this element from the DOM
    const arcgisMapService = this.get('arcgisMapService');
    const mapElementId = this.get('mapElementId');
    arcgisMapService.destroyMap(mapElementId);
  }
});
