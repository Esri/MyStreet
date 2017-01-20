import Ember from 'ember';

export default Ember.Component.extend({
  featureService: Ember.inject.service(),
  location: [],
  featureInfos: [],

  loading: false,

  onAddressChanged: Ember.observer('location', function() {
    let url = this.get('layer.url');
    let location = this.get('location');
    this.set('loading', true);
    this.queryFeature(url, location)
      .then((result) => {
        this.set('featureInfos', result);
      })
      .then(() => {
        this.set('loading', false);
      })
      .catch(() => {
        this.set('loading', false);
      });
  }),

  hasData: Ember.computed('featureInfos', function(){
    return (this.get('featureInfos.length') > 0);
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
        // console.log('results from t-f', results);
        results.fields.forEach((field) => {
          fields[field.name] = field;
        });

        let featureInfos = [];

        results.features.forEach((feature) => {
          let data = feature.attributes;
          // Template replace `{POP00001}` -> feature['POP00001']
          var featureTitleInterpolated = featureTitle.replace(/\{(\w*)\}/g, (m,key) => {
            return this.getValue(data, key, fields);
          });
          var featureDescriptionInterpolated = featureDescription.replace(/\{(\w*)\}/g,(m,key) =>{
            return this.getValue(data, key, fields);
          });
          let featureInfo = {"title": featureTitleInterpolated, "description": featureDescriptionInterpolated};
          featureInfos.pushObject(featureInfo);
        });

        return featureInfos;
      });
  }
});
//
