import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    setDataset (val) {
      console.log(val);
    }
  }
});
