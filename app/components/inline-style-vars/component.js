import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  tagName: 'style',
  css: '',
  themeJson: '',
  loaded: false,

  derivedTheme: Ember.computed('themeJson', function() {
    let brandPrimary = this.get('themeJson.brand.primary') || '#1c66a6';
    let bodyBg = this.get('themeJson.body.bg') || '#f8f8f8';
    let linkColor = this.get('themeJson.brand.secondary') || '#136fbf';
    let textColor = this.get('themeJson.text.color') || '#4c4c4c';
    // TODO - use color js here to lighten/darken and mature the aesthetics

    let cssString = `
      .panel-default, .list-group-item, .form-control {
        background-color: ${bodyBg};
        color: ${textColor};
      }
    `;
    this.set('css', cssString);
  }),




  didReceiveAttrs() {
    let href;
    if (this.get('paramHref')) {
      href = this.get('paramHref');
    } else {
      href = this.get('configHref');
    }
    console.log('href in inline-style-vars::', href);
    if (!this.get('loaded')) {
      this.get('ajax').request(href, {dataType: 'json'}).then((response) =>{
        console.log(response);
        this.set('themeJson', response);
      });
    }
  }
});
