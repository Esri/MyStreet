import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  featureService: service(),

  init () {
    this._super(...arguments);
    this.set('feature', []);
  },
});
