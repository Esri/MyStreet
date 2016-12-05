import Ember from 'ember';

export default Ember.Component.extend({
  itemsService: Ember.inject.service('items-service'),
  queryService: Ember.inject.service('query-service'),

  tagName: 'div',
  classNames: [],

  location: null, // passed in
  layer: null,    // passed in
  features: [],
  distance: null,

  // getFeatures:
  //   // Ember.computed('layer', 'location', function() {
  //   Ember.on('didInsertElement', function() {
  //     let layerUrl = this.get('layer').url;
  //     let layerTitle = this.get('layer').title;
  //     let location = this.get('location').x +","+ this.get('location').y;
  //     let featureTitle = this.get('layer').popupInfo.title;
  //     let featureDescription = this.get('layer').popupInfo.description;
  //     return this.query(layerTitle, layerUrl, location, featureTitle, featureDescription).then((data) => {
  //       this.set('features', data.features);
  //     });
  // }),

  didInsertElement(){
    this._super(...arguments);
    let layerUrl = this.get('layer').url;
    let layerTitle = this.get('layer').title;
    if(this.get('location.x')){
      let location = this.get('location').x +","+ this.get('location').y;
      let featureTitle = this.get('layer').popupInfo.title;
      let featureDescription = this.get('layer').popupInfo.description;
      return this.query(layerTitle, layerUrl, location, featureTitle, featureDescription)
      .then((data) => {
        //this.set('features', data.features);
        this.set('model', data);
      });
    }

  },


  actions: {
    setDistance (distance) {
      Ember.debug('Distance set to ' + distance );
    }
  },


  coerceAttributeValue: function(data, key, fields) {

    switch (fields[key].type) {
      case "esriFieldTypeDate":
        return new Date(data[key]);
        break;
      default:
        return data[key];
    }
  },

  getValue: function(data, key, fields) {
    if(data.hasOwnProperty(key)) {
      return this.coerceAttributeValue(data,key,fields);
    } else {
      return "";
    }
  },

  hasData: Ember.computed('features', function(){
    return (this.get('features.length') > 0);
  }),

  features: Ember.computed('model.features.[]', function(){
    return this.get('model.features');
  }),

  distance: Ember.computed('model', function(){
    return this.get('model.distance');
  }),


  // Webmap: 39b2d247f702476e8575d02c0e05d0a9
  query: function(layerTitle, layerUrl, location, title, description) {
    let url = layerUrl + "/query?outFields=*&geometryType=esriGeometryPoint&geometry=" + location + "&inSR=4326&f=json";
    let distance = null;
    // Add a buffer if nearby features
    if(layerTitle.indexOf('Nearby') !== -1) {
      let match = layerTitle.match(/Nearby (\d+)/)
      if(match !== null ) {
        distance=parseInt(match[1]);
      }
      url += "&distance=" + distance + "&units=esriSRUnit_Meter";
    }

    return this.get('queryService').getData(url)
    .then((queryData)=>{
      let self = this;
      let features = [];
      let fields = {}
      //setup a default model... we will push data into this
      let model = {
        title: layerTitle,
        features: [],
        distance: distance
      };
      //check if we got anything back...
      if (queryData.features.length){
        queryData.fields.forEach((field) => {
          fields[field.name] = field;
        });
        queryData.features.forEach((feature, index, enumerable) => {
          var data = feature.attributes;
          // Template replace `{POP00001}` -> feature['POP00001']
          var featureTitle = title.replace(/\{(\w*)\}/g, (m,key) => {
            return this.getValue(data, key, fields);
          });
          var featureDescription = description.replace(/\{(\w*)\}/g,(m,key) =>{
            return this.getValue(data, key, fields);
          });
          model.features.push({title: featureTitle, description: featureDescription})
        })
      }
      return model;

    });
  },
});
