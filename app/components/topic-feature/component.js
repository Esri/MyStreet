import Ember from 'ember';

export default Ember.Component.extend({
  appSettings: Ember.inject.service(),
  featureService: Ember.inject.service(),
  addressChanged: Ember.computed('property', function() {
    // body
    // TODO set a watcher on returned address that trigers the lookup
  }),

  // layer: {},
  features: [
    {title: "testTitle", description: "testDescription"}
  ],

  layer: {},

  init () {
    this._super.apply(this, arguments);
    // console.log(this.get('appSettings.settings.webmap'));
    console.log('topic-feature::layer ', this.get('layer'));
    console.log('topic-feature::layerUrl ', this.get('layer.url'));

    let returned = this.fSQuery();
    console.log('returned', returned);

    // this.set('features').this.fSQuery();
    // let url = layerUrl + "/query?outFields=*&geometryType=esriGeometryPoint&geometry=" + location + "&inSR=4326&f=json";
      // turn into an object

      //https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Demographic_WebMercator/MapServer/0/query?outFields=*&geometryType=esriGeometryPoint&geometry=-118.9138,33.7148,-117.5735,34.3895&inSR=4326&f=json
      //https://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Historic_WebMercator/MapServer/6/query?outFields=*&geometryType=esriGeometryPoint&geometry=-76.99206903515704,38.92428366895723&inSR=4326&f=json
  },

  beforeModel () {

  },

  fSQuery () {
    let options = {
      "outFields": "*",
      "geometryType": "esriGeometryPoint",
      "geometry": "-118.9138,33.7148,-117.5735,34.3895",
      // {
      //   "xmin": -118.9138,
      //   "ymin": 33.7148,
      //   "xmax": -117.5735,
      //   "ymax": 34.3895,
      // },
      "inSR": 4326
      // "f": "json"
    }

    return this.get('featureService').query(this.get('layer.url'), options)
      .then((results) => {
        console.log('results from topic-feature component ::', results);

        // this.set('returnedAddress', results.locations[0].name);
        return results;
      });

      // "/query?outFields=*&geometryType=esriGeometryPoint&geometry=" + "1003 Evarts St NE, Washington, District of Columbia, 20018" /*this.get('appSettings')*/ + "&inSR=4326&f=json"/*, options*/)
  }
});
