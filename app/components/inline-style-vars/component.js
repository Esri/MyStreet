import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  tagName: 'style',
  css: '',
  themeJson: '',
  loaded: false,

// TODO streamline this = (using ember observer?)
  derivedTheme: Ember.computed('themeJson', function() {
    let brandPrimary = this.get('themeJson.brand.primary') || '#136fbf';
    let bodyBg = this.get('themeJson.body.bg') || '#136fbf';
    let linkColor = this.get('themeJson.brand.secondary') || '#136fbf';
    let textColor = this.get('themeJson.text.color') || '#136fbf';

    console.log('brandPrimary', brandPrimary);
    console.log('bodyBg', bodyBg);
    console.log('linkColor', linkColor);
    console.log('textColor', textColor);

// how to lighten or darken is pure css
// how to set hierarchy for repeating themes
    let cssString = `
      .panel-default, .list-group-item {
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
