import Ember from 'ember';
// import layout from './template';

export default Ember.Component.extend({
  // layout,
  esriLoader: Ember.inject.service('esri-loader'),

  // once we have a DOM node to attach the map to...
  // didInsertElement () {
  //   this._super(...arguments);
  //   // load the map modules
  //   this.get('esriLoader').loadModules(['esri/map', 'esri/layers/VectorTileLayer']).then(modules => {
  //     const [Map, VectorTileLayer] = modules;
  //     // create a map at the DOM node
  //     this._map = new Map(this.elementId, {
  //       center: [2.3508, 48.8567], // longitude, latitude
  //       zoom: 11
  //     });
  //     // add a layer
  //     var vtlayer = new VectorTileLayer('https://www.arcgis.com/sharing/rest/content/items/bf79e422e9454565ae0cbe9553cf6471/resources/styles/root.json');
  //     this._map.addLayer(vtlayer);
  //   });
  // },
  //
  // // destroy the map before this component is removed from the DOM
  // willDestroyElement () {
  //   if (this._map) {
  //     this._map.destroy();
  //     delete this._map;
  //   }
  // },

  // once we have a DOM node to attach the map to...
  didInsertElement () {
    this._super(...arguments);
    // load the map modules
    this.get('esriLoader').loadModules(['esri/views/MapView', 'esri/WebMap']).then(modules => {
      const [MapView, WebMap] = modules;
      // load the webmap from a portal item
      const webmap = new WebMap({
        portalItem: { // autocasts as new PortalItem()
          id: this.itemId
        }
      });
      // Set the WebMap instance to the map property in a MapView.
      this._view = new MapView({
        map: webmap,
        container: this.elementId
      });
    });
  },

  // destroy the map before this component is removed from the DOM
  willDestroyElement () {
    if (this._view) {
      delete this._view;
    }
  }
});
