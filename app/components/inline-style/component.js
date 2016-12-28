import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),

  tagName: 'style',

  css: '',

  loaded: false,
  didReceiveAttrs() {
    console.log('loaded', this.get('loaded'));
    if (!this.get('loaded')) {
      let href = this.get('href');
      this.get('ajax').request(href, {dataType: 'text'}).then((css) =>{
        this.set('css', css);
        this.set('loaded', true);
      });
    }
  }
});
