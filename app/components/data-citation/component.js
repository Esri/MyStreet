import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),

  init () {
    this._super.apply(this, arguments);
  },

  didReceiveAttrs() {
    let urlRegex = this.get('layer.url').replace(/.*?\/\//g,"http://");
    let urlFilter = `https://opendata.arcgis.com/api/v2/datasets?include=sites&filter[url]=${urlRegex}`
    console.log('urlFilter', urlFilter);
    this.get('ajax').request(urlFilter, {dataType: 'json'})
      .then((response) =>{
        console.log(response);
        this.set('datasetName', response.data[0].attributes.name);
        this.set('attributeName', response.included[0].attributes.title);

        let baseUrl = response.included[0].attributes.url;
        let id = response.data[0].id;
        let odLink = `${baseUrl}/datasets/${id}`;

        this.set('odLink', odLink);
        this.set('agolLink', response.data[0].attributes.landingPage);
        this.set('serverLink', this.get('layer.url'));

      });
  }

});
