import Ember from 'ember';
import arcgisUtils from 'esri/arcgis/utils';

export default Ember.Service.extend({
  maps: {},

  createMap(itemIdOrItemInfo, mapDiv, options) {
    return arcgisUtils.createMap(itemIdOrItemInfo, mapDiv, options).then(response => {
      // hold on to map reference before returning response
      const key = typeof mapDiv === 'string' ? mapDiv : mapDiv.id;
      this.set(`maps.${key}`, response.map);
      return response;
    });
  },

  // get a map by id
  getMap(key) {
    return this.maps[key];
  },

  // destroy a map by id and remove from collection
  destroyMap(key) {
    const map = this.getMap(key);
    if (map) {
      if (map.destroy) {
        map.destroy();
      }
      this.set(`maps.${key}`, null);
    }
  }
});
