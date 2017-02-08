import Ember from 'ember';

export default Ember.Component.extend({
  candidates: [],

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

  // pseudo code
  // fill in ul with options from geocode return
    // todo - elements that are selectable and identifiable
  // set the address based on user selections
  // show/hide ul based on user interaction

  initTypeahead: function () {
    let opts = {
      highlight: true,
      minLength: this.get('minLength'),
      hint: false
    };
    let datasets = {
      name: 'candidates',
      // templates: {
      //   empty: ''
      // },
      // limit: this.get('limit'),
      async: true,
      source: (query, syncResults, asyncResults) => {
        this.get('source')(query)
          .then((results)=>{
            // console.log('results111', results.candidates);
            // let addresses
            // $.each(results.candidates, function(i) {
            //   console.log('i', i);
            //
            // });

            for (var i = 0; i++; i<results.candidates.length) {
              console.log('i', i);
            }

            asyncResults(results.candidates);
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
