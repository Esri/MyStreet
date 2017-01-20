import Ember from 'ember';

export default Ember.Component.extend({
  init () {
    this._super.apply(this, arguments);
  },
   actions: {
    setAddress () {		
      this.sendAction('setAddress');		
    }
  }
});
