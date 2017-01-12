import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  tagName: 'style',
  css: '',
  loaded: false,

  didReceiveAttrs() {
    let href;
    if (this.get('paramHref')) {
      href = this.get('paramHref');
    } else {
      href = this.get('configHref');
    }
    if (!this.get('loaded')) {
      this.get('ajax').request(href, {dataType: 'text'}).then((css) =>{
        this.set('css', css);
        this.set('loaded', true);
      });
    }
  }
});
