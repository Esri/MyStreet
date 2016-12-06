import Ember from "ember";

export default Ember.Controller.extend({
  // queryParams: ['address'],

  dataset: "",
  addressCopy: "",
  // _doSearch (val) {
  //   this.set('address', val);
  // },
  actions: {
    setDataset (val) {
      console.log(val);
      // always set the copy
      //Ember.debug('setAddress: ' + val);
      this.set('dataset', val);
      // the debounce function needs to be the *same*
      // so we have to leverage the controller state

      // now call debounce to do the set if no futher inputs have happened.
      // Ember.run.debounce(this, this._doSearch, val, 500);

    }
  }
});
