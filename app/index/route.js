import Ember from 'ember';

export default Ember.Route.extend({
  itemsService: Ember.inject.service('items-service'),
  appSettings: Ember.inject.service('app-settings'),

  beforeModel () {
    Ember.debug('indexRoute::beforeModel');

  },

  model (params) {
    // TODO Eventually, check if params.id === null, then make a this.get('itemService').search(...) call to locate all the App Config Items for Open Street.

    return Ember.RSVP.hash({
      item: this.get('itemsService').getById(params.id),
      data: this.get('itemsService').getDataById(params.id),
    })
    .then((results) => {
      // store in appSettings
      console.log('results', results);
      this.get('appSettings').set('settings', results);
    })

  }
});
