import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  featureService: service(),
  feature: [],

  didInsertElement () {
    this._super.apply(this, arguments);
  },
});
