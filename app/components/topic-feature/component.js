import Ember from 'ember';

export default Ember.Component.extend({
  featureService: Ember.inject.service(),
  features: [],

  didInsertElement () {
    this._super.apply(this, arguments);

    console.log('topic-feature::features ', this.get('features'));

    // TODO put in loop to skip if no location
  },
});
//
