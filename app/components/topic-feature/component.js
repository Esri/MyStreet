import Ember from 'ember';

export default Ember.Component.extend({
  featureService: Ember.inject.service(),
  location: [],
  features: [],

  onAddressChanged: Ember.observer('location', function() {
    let url = this.get('layer.url');
    let location = this.get('location');
    this.fSQuery(url, location);
  }),

  hasData: Ember.computed('features', function(){
    return (this.get('features.length') > 0);
  }),

  didInsertElement () {
    this._super.apply(this, arguments);
    console.log('topic-feature::layer ', this.get('layer'));
    // console.log('topic-feature::layer ', this.get('layer'));
    // console.log('topic-feature::layerUrl ', this.get('layer.url'));

    // TODO put in loop to skip if no location
  },

  fSQuery (url, location) {
    let options = {
      "outFields": "*",
      "geometryType": "esriGeometryPoint",
      "geometry": [],
      "inSR": 4326
      // "f": "json"
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
