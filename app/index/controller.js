import Ember from 'ember';

export default Ember.Controller.extend({
  appSettings: Ember.inject.service('app-settings'),
  test: "test",
  // test2: this.get('appSettings').data.authoringApp,

  init () {
    this._super.apply(this, arguments);
    // console.log(model);
    console.log(this.get('appSettings'));

  },

  model () {

  }

});
