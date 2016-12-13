import Ember from 'ember';

export default Ember.Component.extend({
  featureService: Ember.inject.service(),
  location: [],
  features: [],

  onAddressChanged: Ember.observer('location', function() {
    let url = this.get('layer.url');
    let location = this.get('location');
    this.fSQuery(url, location);
    // TODO put in loop to skip if no location - this may already have been achieved
  }),

  hasData: Ember.computed('features', function(){
    return (this.get('features.length') > 0);
  }),

  didInsertElement () {
    this._super.apply(this, arguments);
  },

  fSQuery (url, location) {


    console.log('layerTitle', layerTitle);
    let layerTitle = this.get('layer.title');
    console.log('layerTitle', layerTitle);

    let options = {
      "outFields": "*",
      "geometryType": "esriGeometryPoint",
      "geometry": [],
      "inSR": 4326,
    }


    if(layerTitle.indexOf('Nearby') !== -1) {
      let match = layerTitle.match(/Nearby (\d+)/);
      let distance;
      if(match !== null ) {
        distance = parseInt(match[1]);
      }
      options.distance = distance;
      options.units = 'esriSRUnit_Meter';
    }

    if (location.length>0) {
      options.geometry = location;
    }

    return this.get('featureService').query(url, options)
      .then((results) => {
        console.log('results call from t-f comp::', results);
        this.set('features', results.features);

        // model.features.push({title: results.featureTitle, description: featureDescription})
        return results;
      });
  }
});
//
