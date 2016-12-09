import Ember from 'ember';

export default Ember.Route.extend({
  itemsService: Ember.inject.service(),
  appSettings: Ember.inject.service(),

  beforeModel () {
    Ember.debug('indexRoute::beforeModel');
  },

  model (params) {
    // TODO Eventually, check if params.id === null, then make a
    // this.get('itemService').search(...) call to locate all the App Config Items for Open Street.

    return Ember.RSVP.hash({
      item: this.get('itemsService').getById(params.id),
      data: this.get('itemsService').getDataById(params.id),
    })
    .then((results) => {
      console.log('results from index route item call', results);
      this.get('appSettings').set('settings', results);
      return this.get('itemsService').getDataById(results.data.values.webmap)
    })
    .then((webmap) => {
      // store in appSettings
      Ember.debug('webmap from index route item call'/* + JSON.stringify(webmap)*/);
      this.get('appSettings').set('settings.webmap', webmap);
    })
    .catch((err) => {
      Ember.debug('Error occured fetching the item: ' + JSON.stringify(err));
    });

  }
});
