import Ember from 'ember';

export default Ember.Controller.extend({
  appSettings: Ember.inject.service('app-settings'),
  openStreets: Ember.inject.service('open-streets'),
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
      console.log(address);
      // do work
      // return promise
      // call service
      // this.set('address', valueFromService)
    }
  }

});
