import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['web-map'],
  esriLoader: Ember.inject.service('esri-loader'),

  // once we have a DOM node to attach the map to...
  didInsertElement () {
    this._super(...arguments);
    // load the map modules

    this.get('esriLoader').loadModules(['esri/views/MapView', 'esri/WebMap', 'esri/config']).then(modules => {
      const [MapView, WebMap, esriConfig] = modules;

      esriConfig.portalUrl = "https://devext.arcgis.com"; // TODO base off of ENV variable, have it be a parameter passed in based on component call

      // load the webmap from a portal item
      const webmap = new WebMap({
        portalItem: // this.get('webmap.item')
        { // autocasts as new PortalItem()
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
