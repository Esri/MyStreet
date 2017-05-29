import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['web-map'],
  esriLoader: Ember.inject.service('esri-loader'),

  // once we have a DOM node to attach the map to...
  didInsertElement () {
    this._super(...arguments);
    // load the arcgis util module
    this.get('esriLoader').loadModules(['esri/arcgis/utils']).then(modules => {
      const [arcgisUtils] = modules;
      // create the map
      return arcgisUtils.createMap(this.get('webmap'), this.elementId)
      .then( response => {
        // get a reference to the map for proper teardown
        this._map = response.map;
        return response;
      });
    });
  },

  // destroy the map before this component is removed from the DOM
  willDestroyElement () {
    if (this._map) {
      if (this._map.destroy) {
        this._map.destroy();
      }
      delete this._map;
    }
  }
});
