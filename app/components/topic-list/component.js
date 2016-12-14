import Ember from 'ember';

export default Ember.Component.extend({
  featureService: Ember.inject.service(),
  location: [],
  features: [],

  onAddressChanged: Ember.observer('location', function() {
    let url = this.get('layer.url');
    let location = this.get('location');
    this.queryFeature(url, location);
  }),

  hasData: Ember.computed('features', function(){
    return (this.get('features.length') > 0);
  }),

  didInsertElement () {
    this._super.apply(this, arguments);
  },

  getValue: function(data, key, fields) {
    if(data.hasOwnProperty(key)) {
      return this.coerceAttributeValue(data,key,fields);
    } else {
      return "";
    }
  },

  coerceAttributeValue: function(data, key, fields) {
    switch (fields[key].type) {
      case "esriFieldTypeDate":
        return new Date(data[key]);
      default:
        return data[key];
    }
  },

  queryFeature (url, location) {
    let layerTitle = this.get('layer.title');
    let featureTitle = this.get('layer.popupInfo.title');
    let featureDescription = this.get('layer.popupInfo.description');

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
        let fields = {};

        results.fields.forEach((field) => {
          fields[field.name] = field;
        });

        this.set('features', results.features);
        this.set('features.info', {featureTitle, featureDescription})

        results.features.forEach((feature) => {
          let data = feature.attributes;
          // Template replace `{POP00001}` -> feature['POP00001']
          var featureTitleInterpolated = featureTitle.replace(/\{(\w*)\}/g, (m,key) => {
            return this.getValue(data, key, fields);
          });
          var featureDescriptionInterpolated = featureDescription.replace(/\{(\w*)\}/g,(m,key) =>{
            return this.getValue(data, key, fields);
          });
          this.set('features.info.featureTitleInterpolated', featureTitleInterpolated)
          this.set('features.info.featureDescriptionInterpolated', featureDescriptionInterpolated)
        });

        return results;
      });
  }
});
//
