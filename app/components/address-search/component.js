import Ember from 'ember';

export default Ember.Component.extend({
  minLength: 2,

  limit: 4,

  value: '',

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

  executeQuery: function (query, asyncResults) {
    this.get('source')(query)
      .then((results)=>{
        let addresses = [];
        console.log('address-search::passed in results', results);
        for (var i = 0; i<results.candidates.length; i++) {
          addresses[i] = results.candidates[i].address;
        }
        console.log('address-search:: addresses array', addresses);
        asyncResults(addresses);
      })
  },

  initTypeahead: function () {
    let opts = {
      highlight: true,
      minLength: this.get('minLength'),
      hint: false
    };
    let datasets = {
      name: 'candidates',
      // limit: this.get('limit'),
      async: true,
      source: (query, syncResults, asyncResults) => {
        Ember.run.debounce(this, 'executeQuery', query, asyncResults, 200, true);
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
