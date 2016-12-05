import Ember from 'ember';

export default Ember.Route.extend({

  queryParams: {
    'location': { refreshModel: false},
    'address': { refreshModel: true},
  },

  itemsService: Ember.inject.service('items-service'),
  featureService: Ember.inject.service('feature-service'),

  // TODO your street adjustment. most of this file looks like i'ts properly implementing the itemsService addon

  getLocation (address, extent) {
    let bbox = [extent[0][0], extent[0][1], extent[1][0], extent[1][1]];
    let url = `//geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find?text=${address}&isCollection=false&outSR=4326&f=json&maxlocations=5&bbox=${bbox}`;
    return this.get('itemsService').request(url)
      .then((data) => {
        let location = (data.locations === undefined) ? {} : data.locations[0];
        return location;
      });
  },

  getItem (id) {
    return this.get('itemsService').getById(id);
  },

  getWebMapData (id) {
    return this.get('itemsService').getDataById(id);
  },

  model (params) {
    // -76.996303,38.890562
    // let coordinates = params.location;

    return Ember.RSVP.hash({
      item: this.getItem(params.id),
      map: this.getWebMapData(params.id)})
      .then((data) => {
      return Ember.RSVP.hash({
        map:data.map,
        address: params.address,
        location: this.getLocation(params.address, data.item.extent)
      })
      .catch((err)=>{
        Ember.debug('Error fetching model: ' + err);
      })
    })


  },
});
