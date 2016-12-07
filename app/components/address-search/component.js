import Ember from 'ember';

export default Ember.Component.extend({
  appSettings: Ember.inject.service('app-settings'),

  init () {
    this._super.apply(this, arguments);
    // console.log(model);
    console.log('appSettings from address-search component', this.get('appSettings').get('settings'));

  },

  actions: {
    setAddress (value) {
      console.log(value);
    }
  }

});
