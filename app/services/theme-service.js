import Ember from 'ember';
import serviceMixin from '../helpers/mixins/service-mixin';

export default Ember.Service.extend(serviceMixin, {

  getById(siteId) {
    let url = `https://opendataqa.arcgis.com/api/v2/sites/${siteId}?fields[sites]=layout,theme`;
    return this.request(url)
    .then((response) => {
      return {
        header: response.data.attributes.layout.header,
        theme: response.data.attributes.theme,
        id: response.data.id
      };
    })
  },


});
