import Ember from 'ember';

export default Ember.Component.extend({
  // appSettings: Ember.inject.service(),
  layer: {},

  init () {
    this._super.apply(this, arguments);
    // console.log(this.get('appSettings.settings.webmap'));
    console.log('topic-feature::layer', this.get('layer'));
  }
});
