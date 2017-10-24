import Ember from 'ember';

export default Ember.Component.extend({
  featureService: Ember.inject.service(),
  feature: [],

  didInsertElement () {
    this._super.apply(this, arguments);
  },
});
