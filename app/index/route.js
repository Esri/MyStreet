import Ember from 'ember';

export default Ember.Route.extend({
  itemsService: Ember.inject.service(),
  appSettings: Ember.inject.service(),
  queryParams: {'loc': {refreshModel: true}},

  renderTemplate (/*controller, model*/) {
    // TODO need to pass in controller and model above?
    Ember.debug('IndexRoute::renderTemplate fired...');
    let errStatus = this.get('appSettings.errStatus');

    if (!errStatus) {
      this.render();
    } else {
      if (errStatus === 500) {
        // TODO fix model pass in below
        this.render('gateway.error', {model: {status: errStatus}});
      } else {
        if (errStatus === 403) {
          this.render('gateway.403');
        }
        if (errStatus === 404 || errStatus === 400) {
          this.render('gateway.404');
        }
      }
    }
  },

  model (params) {
    // TODO Eventually, check if params.id === null, then make a
    // this.get('itemService').search(...) call to locate all the App Config Items for Open Street.

    return Ember.RSVP.hash({
      item: this.get('itemsService').getById(params.id),
      data: this.get('itemsService').getDataById(params.id),
    })
    .then((results) => {
      console.log('results from index route item call:', results);
      this.get('appSettings').set('settings', results);
      // this.get('appSettings').set('errStatus', 200);
      return this.get('itemsService').getDataById(results.data.values.webmap)
    })
    .then((webmap) => {
      // store in appSettings
      console.log('webmap from index route item call:', webmap);
      this.get('appSettings').set('settings.webmap', webmap);
    })
    .catch((err) => {
      this.get('appSettings').set('errStatus', err.code || 500);
      Ember.debug('Error occured fetching the item: ' + JSON.stringify(err));
    });
  },

});
