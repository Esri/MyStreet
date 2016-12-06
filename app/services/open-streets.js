import Ember from 'ember';

export default Ember.Service.extend({
  appSettings: Ember.inject.service(),
  itemsService: Ember.inject.service('items-service'),
  featureService: Ember.inject.service('feature-service'),
  siteLookup: Ember.inject.service('site-lookup'),

  // Webmap: 39b2d247f702476e8575d02c0e05d0a9
  testFunc () {
    console.log('**Test Function**');
  },

  beforeModel: function () {
    let initializationPromises = {
      // i18nStatus: this._initI18n(),
      // sessionStatus: this._initSession()
    }

    return Ember.RSVP.hashSettled(initializationPromises)
    .then((/*results*/) => {
      // now we fire off the site fetch (this needed)
      return this.get('appSettings').initializeSite();
    })
    .then(() => {
      this._addSiteLinksJson();
      return;
    })
    .catch((err) => {
      Ember.debug('Error occured initializing the app ' + JSON.stringify(err));
    });
  },

  model () {
  // we do this so we have the Site as the model in renderTemplate
    console.log('111appsettings', this.get('appSettings').get('site'));
    return this.get('appSettings').get('site');
  },

  query: function(layerTitle, layerUrl, location, title, description) {
    // console.log('query');
    // let url = layerUrl + "/query?outFields=*&geometryType=esriGeometryPoint&geometry=" + location + "&inSR=4326&f=json";
    // let distance = null;
    // // Add a buffer if nearby features
    // if(layerTitle.indexOf('Nearby') !== -1) {
    //   let match = layerTitle.match(/Nearby (\d+)/)
    //   if(match !== null ) {
    //     distance=parseInt(match[1]);
    //   }
    //   url += "&distance=" + distance + "&units=esriSRUnit_Meter";
    // }
    // return this.get('queryService').getData(url)
    // .then((queryData)=>{
    //   let self = this;
    //   let features = [];
    //   let fields = {}
    //   //setup a default model... we will push data into this
    //   let model = {
    //     title: layerTitle,
    //     features: [],
    //     distance: distance
    //   };
    //   //check if we got anything back...
    //   if (queryData.features.length){
    //     queryData.fields.forEach((field) => {
    //       fields[field.name] = field;
    //     });
    //     queryData.features.forEach((feature, index, enumerable) => {
    //       var data = feature.attributes;
    //       // Template replace `{POP00001}` -> feature['POP00001']
    //       var featureTitle = title.replace(/\{(\w*)\}/g, (m,key) => {
    //         return this.getValue(data, key, fields);
    //       });
    //       var featureDescription = description.replace(/\{(\w*)\}/g,(m,key) =>{
    //         return this.getValue(data, key, fields);
    //       });
    //       model.features.push({title: featureTitle, description: featureDescription})
    //     })
    //   }
    //   return model;
    // });
  },
});
