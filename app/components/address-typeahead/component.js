import Ember from 'ember';

export default Ember.Component.extend({
  candidates: [],

  minLength: 2,

  limit: 4,

  value: '',

  tagName: 'input',

  attributeBindings: [ 'placeholder', 'value', 'aria-label' ],
  //
  // 'aria-label': Ember.computed(function () {
  //  return this.get('intl').t('components.od_search.search_placeholder');
  // }),

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

  // TODO deal with isdestroyed // isdestroying logic
    // TODO !isdestorying logic in other parts of the app as well

  // Q - maybe the app needs base.extend on one-way-input

  // pseudo code
  // fill in ul with options from geocode return
    // todo - elements that are selectable and identifiable
  // set the address based on user selections
  // show/hide ul based on user interaction

  initTypeahead: function () {
    console.log('typeahead11');
    var myVal = this.$().typeahead('val');
    console.log('test11', myVal);

    var opts = {
      highlight: true,
      minLength: this.get('minLength'),
      hint: false
    };

    var datasets = {
      name: 'datasets',
      templates: {
        empty: ''
      },
      limit: this.get('limit'),
      async: true,
      // source: (query, syncResults, asyncResults) => {
      //   this.get('autocompleteService').fetch(query)
      //     .then((response) => {
      //       let resp = response ? response.data : [];
      //       asyncResults(resp);
      //     });
      source: () => {
        this.get('candidates')
        console.log('source', this.get('candidates'));
      }
    };

    this.typeahead = this.$('').typeahead(opts, datasets)
      .on('typeahead:select', (e, datum) => {
        Ember.run(() => {
          let onSelectFunc = this.get('onSelect');
          if (onSelectFunc) { onSelectFunc(datum); }
          // this.get('telemetry').logAction({
          //   category: 'Search',
          //   action: 'autocomplete select',
          //   eventLabel: datum
          // });
        });
      })
      .on('keyup', (e) => {
        console.debug('>>>>> autocomplete keyup');
        // TODO: we bound value to q on this thing but it is not propagating so...
        Ember.run(() => {
          this.set('value', this.typeahead.typeahead('val'));
          console.log('value', this.typeahead.typeahead('val'));
          if (e.which === 13) {
            this.typeahead.typeahead('close');
          }
        });
      })
      // .on('typeahead:asyncreceive', () => {
      //   //this one if for testing purposes
      //   Ember.run(() => {
      //     let receiveFunc = this.get('onReceive');
      //     if (receiveFunc) { receiveFunc(); }
      //   });
      // });
  },
});
