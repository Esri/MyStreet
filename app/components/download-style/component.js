import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  //
  // TODO tagname set to style gives issues (dom doesn't render)
  tagName: 'style',
  // tagName: '',

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
