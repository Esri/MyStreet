import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['web-map'],
  esriLoader: Ember.inject.service('esri-loader'),

  // once we have a DOM node to attach the map to...
  didInsertElement () { // TODO change to didReceiveAttrs and verify that webmap exists AND has changed.
    // ^(move contents to a function like createMap(), and leave condiditonal logic here). Webmap component in cards is a good place to start.
    // ^/ember-arcgis-layout-cards/addon/components/web-map/component.js
    this._super(...arguments);
    if (!this.get('webmap')) return;
    // load the arcgis util module
    this.get('esriLoader').loadModules(['esri/arcgis/utils'], {url: 'https://js.arcgis.com/3.20'}).then(modules => {
      if (!this.get('isDestroying') || this.get('isDestroyed')) {
        const [arcgisUtils] = modules;
        // create the map
        return arcgisUtils.createMap(this.get('webmap'), this.elementId)
        .then( response => {
          // get a reference to the map for proper teardown
          this._map = response.map;
          // don't move the map if the user is just trying to scroll down the page
          this._map.disableScrollWheelPan()
          this._map.disableScrollWheelZoom();
          return response;
        });
      }
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
