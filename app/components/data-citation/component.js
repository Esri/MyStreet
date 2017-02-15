import Ember from 'ember';
import ENV from '../../config/environment';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  citationFound: false,

  init () {
    this._super.apply(this, arguments);
  },

  didReceiveAttrs() {
    let envUrl = ENV.APP.baseURL;
    let urlRegex = this.get('layer.url').replace(/.*?\/\//g,"http://");
    let urlFilter = `https://${envUrl}/api/v2/datasets?include=sites&filter[url]=${urlRegex}`;  
    this.get('ajax').request(urlFilter, {dataType: 'json'})
      .then((response) =>{
        // this component could have been destroyed while waiting for the promise to resolve
        if (!this.get('isDestroyed') && !this.get('isDestroying')) {
          if (response.data[0]) {
            this.set('dataName', response.data[0].attributes.name);

            let baseUrl = response.included[0].attributes.url;
            let id = response.data[0].id;

            let odLink = `${baseUrl}/datasets/${id}`;
            let agolLink = response.data[0].attributes.landingPage;
            let serverLink = this.get('layer.url');
            let dataLink;

            this.set('citationFound', true);
            if (odLink) {
              dataLink = odLink;
            } else if (agolLink) {
              dataLink = agolLink;
            } else if (serverLink) {
              dataLink = serverLink;
            } else {
              this.set('citationFound', false);
            }
            this.set('dataLink', dataLink)
          }
        }
      });
  }
});
