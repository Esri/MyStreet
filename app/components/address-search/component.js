import Ember from 'ember';

export default Ember.Component.extend({
  candidates: [],

  init () {
    this._super.apply(this, arguments);
  },

  // TODO deal with isdestroyed // isdestroying logic
    // TODO !isdestorying logic in other parts of the app as well

  // pseudo code
  // fill in ul with options from geocode return
  // set the address based on user selections
  // show/hide ul based on user interaction

   actions: {
    setAddress () {
      this.sendAction('setAddress');
    }
  }
});
