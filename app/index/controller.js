import Ember from 'ember';

export default Ember.Controller.extend({
  appSettings: Ember.inject.service(),
  openStreets: Ember.inject.service(),
  address: "",

  init () {
    this._super.apply(this, arguments);
    // console.log(model);
    console.log('appSettings from index controller', this.get('appSettings').get('settings'));
    this.get('openStreets').testFunc();

  },

  model () {

  },

  actions: {
    onAddressChanged (address) {
      console.log('onAddressChanged', address);
      // do work
      // return promise
      // call service
      // this.set('address', valueFromService)
    }
  }

});
