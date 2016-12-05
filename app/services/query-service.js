import Ember from 'ember';
import serviceMixin from '../mixins/service-mixin';

export default Ember.Service.extend(serviceMixin, {
  // itemsService: Ember.inject.service('items-service'),

  getData(url,lon,lat) {
    // Population: http://maps2.dcgis.dc.gov/dcgis/rest/services/DCGIS_DATA/Demographic_WebMercator/MapServer/0/query?outFields=*&geometryType=esriGeometryPoint&geometry=-76.996303,38.890562&inSR=4326&f=json
    // Crimes: https://maps2.dcgis.dc.gov/dcgis/rest/services/FEEDS/CDW_Feeds/MapServer/8/query?outFields=*&geometryType=esriGeometryPoint&geometry=-76.996303,38.890562&distance=100&inSR=4326&f=json&units=esriSRUnit_Meter
    // let url = ;
    return this.request(url);
  },


});
