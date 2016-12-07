import Ember from 'ember';

export default Ember.Component.extend({
  appSettings: Ember.inject.service(),
  openStreets: Ember.inject.service(),

  init () {
    this._super.apply(this, arguments);
    // console.log(model);
    console.log('appSettings from address-search component', this.get('appSettings').get('settings'));

  },

  // actions: {
  //   setAddress (value) {
  //     this.get('openStreets').findLocationAddress(value);
  //   }
  // }

});
