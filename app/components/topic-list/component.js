import { once } from '@ember/runloop';
import { observer, computed } from '@ember/object';
import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  featureService: service(),

  loading: false,


  // TODO: replace this w/ didInsertElement()
  /* eslint-disable ember/no-on-calls-in-components */
  onAddressChanged: on('init', observer('location', function() {
    once(this, 'updateFeatures');
  })),
  /* eslint-enable ember/no-on-calls-in-components */

  updateFeatures () {
    let url = this.get('layer.url');
    let location = this.get('location');
    this.set('loading', true);
    this.queryFeature(url, location)
      .then((result) => {
        if (!this.get('isDestroyed') && !this.get('isDestroying')) {
          this.set('featureInfos', result);
        }
      })
      .then(() => {
        if (!this.get('isDestroyed') && !this.get('isDestroying')) {
          this.set('loading', false);
        }
      })
      .catch(() => {
        if (!this.get('isDestroyed') && !this.get('isDestroying')) {
          this.set('loading', false);
        }
      });
  },

  hasData: computed('featureInfos', function(){
    return (this.get('featureInfos.length') > 0);
  }),

  init () {
    this._super(...arguments);
    this.setProperties({
      location: [],
      featureInfos: []
    })
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
      options.resultRecordCount = 1;
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
          var featureDescriptionInterpolated;
          if (featureDescription) { // guard if the `popupInfo.description` is null
            featureDescriptionInterpolated = featureDescription.replace(/\{(\w*)\}/g,(m,key) =>{
              return this.getValue(data, key, fields);
            });
          } else {
            featureDescriptionInterpolated = "";
          }
          let featureInfo = {"title": featureTitleInterpolated, "description": featureDescriptionInterpolated};
          featureInfos.pushObject(featureInfo);
        });
        return featureInfos;
      });
  }
});
//
