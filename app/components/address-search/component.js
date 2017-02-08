import Ember from 'ember';

export default Ember.Component.extend({
  minLength: 2,

  limit: 4,

  value: '',

  init: function () {
    this._super(...arguments);
  },

  didInsertElement: function() {
    this._super(...arguments);
    this.initTypeahead();
  },

  willDestroyElement: function () {
    if (this.typeahead && this.typeahead.typeahead) {
      this.typeahead.off();
      this.typeahead.typeahead('destroy');
    }
  },

  initTypeahead: function () {
    let opts = {
      highlight: true,
      minLength: this.get('minLength'),
      hint: false
    };
    let datasets = {
      name: 'candidates',
      limit: this.get('limit'),
      async: true,
      source: (query, syncResults, asyncResults) => {
        this.get('source')(query)
          .then((results)=>{
            let addresses = [];
            for (var i = 0; i<results.candidates.length; i++) {
              addresses[i] = results.candidates[i].address;
            }
            asyncResults(addresses);
          })
      }
    };
    this.typeahead = this.$('.typeahead').typeahead(opts, datasets);
  },

  actions: {
    setAddress () {
      this.sendAction('setAddress');
    }
  }
});
